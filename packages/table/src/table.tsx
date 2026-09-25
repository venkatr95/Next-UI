import * as React from "react";
import { cn } from "@next-ui/utils";
import { getStyleClasses, colors } from "@next-ui/theme";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";
import type {
  TableColumnConfig,
  SortDescriptor,
  SortDirection,
  SelectionMode,
  TableVariant,
} from "./types";
import { TableHeader } from "./table-header";
import { TableBody } from "./table-body";
import { TableRow } from "./table-row";
import { TableCell } from "./table-cell";
import { TableColumn } from "./table-column";

const TableContext = React.createContext<{
  columns: TableColumnConfig[];
  sortDescriptor?: SortDescriptor;
  onSortChange?: (descriptor: SortDescriptor) => void;
  selectionMode: SelectionMode;
  selectedKeys: Set<string | number>;
  onSelectionChange?: (keys: Set<string | number>) => void;
  rowKey?: string;
  color?: keyof typeof colors;
  variant: TableVariant;
  isStriped: boolean;
  isCompact: boolean;
  isHeaderSticky: boolean;
  styleType?: string;
  visibleColumns: string[];
  deviceType?: "mobile" | "tablet" | "desktop";
} | null>(null);

function useTableContext() {
  const ctx = React.useContext(TableContext);
  if (!ctx) throw new Error("Table components must be used within a Table");
  return ctx;
}

export interface TableProps
  extends Omit<BaseComponentProps<HTMLTableElement>, "color" | "styleType" | "deviceType">,
    Omit<React.HTMLAttributes<HTMLTableElement>, keyof BaseComponentProps> {
  columns: TableColumnConfig[];
  data: Record<string, unknown>[];
  selectionMode?: SelectionMode;
  sortDescriptor?: SortDescriptor;
  onSortChange?: (descriptor: SortDescriptor) => void;
  onSelectionChange?: (keys: Set<string | number>) => void;
  selectedKeys?: Set<string | number>;
  color?: keyof typeof colors;
  variant?: TableVariant;
  isStriped?: boolean;
  isCompact?: boolean;
  isHeaderSticky?: boolean;
  deviceType?: ResponsiveValue<"mobile" | "tablet" | "desktop">;
  styleType?: ResponsiveValue<string>;
  rowKey?: string;
  emptyContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      as: Component = "div",
      className,
      columns,
      data,
      selectionMode = "none",
      sortDescriptor,
      onSortChange,
      onSelectionChange,
      selectedKeys: controlledSelectedKeys,
      color = "primary",
      variant = "default",
      isStriped: isStripedProp,
      isCompact = false,
      isHeaderSticky = false,
      deviceType: deviceTypeProp,
      styleType,
      rowKey = "id",
      emptyContent = "No data to display",
      bottomContent,
      children,
      ...props
    },
    ref
  ) => {
    const { deviceType: contextDeviceType } = useResponsiveContext();
    const deviceType = resolveResponsiveValue(deviceTypeProp, contextDeviceType) ?? contextDeviceType;
    const resolvedStyleType =
      typeof styleType === "string" ? styleType : resolveResponsiveValue(styleType, contextDeviceType);

    const isStriped = isStripedProp ?? variant === "striped";

    const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<Set<string | number>>(
      new Set()
    );
    const isControlled = controlledSelectedKeys !== undefined;
    const selectedKeys = isControlled ? controlledSelectedKeys : internalSelectedKeys;

    const handleSelectionChange = React.useCallback(
      (keys: Set<string | number>) => {
        if (!isControlled) setInternalSelectedKeys(keys);
        onSelectionChange?.(keys);
      },
      [isControlled, onSelectionChange]
    );

    const visibleColumns = React.useMemo(() => {
      return columns
        .filter((col) => {
          if (col.hideOnMobile && deviceType === "mobile") return false;
          if (col.hideOnTablet && deviceType === "tablet") return false;
          return true;
        })
        .map((c) => c.key);
    }, [columns, deviceType]);

    const colorClasses = colors[color as keyof typeof colors] ?? colors.primary;

    const contextValue = React.useMemo(
      () => ({
        columns,
        sortDescriptor,
        onSortChange,
        selectionMode,
        selectedKeys,
        onSelectionChange: handleSelectionChange,
        rowKey,
        color,
        variant,
        isStriped,
        isCompact,
        isHeaderSticky,
        styleType: resolvedStyleType,
        visibleColumns,
        deviceType,
      }),
      [
        columns,
        sortDescriptor,
        onSortChange,
        selectionMode,
        selectedKeys,
        handleSelectionChange,
        rowKey,
        color,
        variant,
        isStriped,
        isCompact,
        isHeaderSticky,
        resolvedStyleType,
        visibleColumns,
        deviceType,
      ]
    );

    const handleSort = (columnKey: string) => {
      if (!onSortChange) return;
      const col = columns.find((c) => c.key === columnKey);
      if (!col?.sortable) return;
      const nextDirection: SortDirection =
        sortDescriptor?.column === columnKey && sortDescriptor?.direction === "ascending"
          ? "descending"
          : "ascending";
      onSortChange({ column: columnKey, direction: nextDirection });
    };

    const handleSelectAll = () => {
      if (selectionMode !== "multiple") return;
      if (selectedKeys.size === data.length) {
        handleSelectionChange(new Set());
      } else {
        const keys = data.map((row) => {
          const k = row[rowKey];
          return typeof k === "string" || typeof k === "number" ? k : String(k);
        });
        handleSelectionChange(new Set(keys));
      }
    };

    const handleSelectRow = (key: string | number) => {
      if (selectionMode === "none") return;
      const next = new Set(selectedKeys);
      if (selectionMode === "single") {
        next.clear();
        next.add(key);
      } else {
        if (next.has(key)) next.delete(key);
        else next.add(key);
      }
      handleSelectionChange(next);
    };

    const variantClasses = {
      default: "border-collapse",
      bordered:
        "border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden",
      striped: "border-collapse",
    };

    return (
      <TableContext.Provider value={contextValue}>
        <Component
          ref={ref}
          className={cn("w-full", getStyleClasses(resolvedStyleType as never), className)}
          {...props}
        >
          <div className="overflow-x-auto rounded-lg">
            <table
              className={cn(
                "w-full text-sm",
                variantClasses[variant],
                getStyleClasses(resolvedStyleType as never)
              )}
            >
              <TableHeader isSticky={isHeaderSticky}>
                <TableRow>
                  {selectionMode !== "none" && (
                    <th
                      className={cn(
                        "px-4 py-3 w-12 border-b border-gray-200 dark:border-gray-700",
                        "bg-gray-50 dark:bg-gray-800/80"
                      )}
                      scope="col"
                    >
                      {selectionMode === "multiple" && (
                        <button
                          type="button"
                          onClick={handleSelectAll}
                          className={cn(
                            "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors",
                            "border-gray-300 dark:border-gray-600",
                            "hover:border-indigo-500 dark:hover:border-indigo-400",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                          )}
                          aria-label="Select all"
                        >
                          {selectedKeys.size === data.length && data.length > 0 && (
                            <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      )}
                    </th>
                  )}
                  {columns
                    .filter((col) => visibleColumns.includes(col.key))
                    .map((col) => (
                      <TableColumn
                        key={col.key}
                        sortable={col.sortable}
                        sortDirection={
                          sortDescriptor?.column === col.key ? sortDescriptor.direction : undefined
                        }
                        onSort={() => handleSort(col.key)}
                        width={col.width}
                        className={isCompact ? "px-2 py-1.5" : undefined}
                      >
                        {col.label}
                      </TableColumn>
                    ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={
                        columns.filter((c) => visibleColumns.includes(c.key)).length +
                        (selectionMode !== "none" ? 1 : 0)
                      }
                      className="px-4 py-12 text-center text-gray-500 dark:text-gray-400"
                    >
                      {emptyContent}
                    </td>
                  </tr>
                ) : (
                  data.map((row, idx) => {
                    const key =
                      (row[rowKey] as string | number) ?? idx;
                    const keyStr = typeof key === "string" || typeof key === "number" ? key : String(key);
                    const isSelected = selectedKeys.has(keyStr);

                    return (
                      <TableRow
                        key={keyStr}
                        isSelected={isSelected}
                        isStriped={isStriped}
                      >
                        {selectionMode !== "none" && (
                          <TableCell align="center" className={isCompact ? "px-2 py-1" : undefined}>
                            <button
                              type="button"
                              onClick={() => handleSelectRow(keyStr)}
                              className={cn(
                                "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors mx-auto",
                                "border-gray-300 dark:border-gray-600",
                                "hover:border-indigo-500 dark:hover:border-indigo-400",
                                isSelected && "bg-indigo-500 border-indigo-500",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                              )}
                              aria-label={`Select row ${keyStr}`}
                            >
                              {(selectionMode === "single" ? isSelected : true) && isSelected && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </button>
                          </TableCell>
                        )}
                        {columns
                          .filter((col) => visibleColumns.includes(col.key))
                          .map((col) => (
                            <TableCell
                              key={col.key}
                              align="left"
                              className={isCompact ? "px-2 py-1" : undefined}
                            >
                              {col.renderCell
                                ? col.renderCell(row[col.key], row)
                                : String(row[col.key] ?? "")}
                            </TableCell>
                          ))}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </table>
          </div>
          {bottomContent && (
            <div className="mt-4 flex justify-center">{bottomContent}</div>
          )}
        </Component>
      </TableContext.Provider>
    );
  }
);

Table.displayName = "Table";

export { TableHeader, TableBody, TableRow, TableCell, TableColumn, useTableContext };
