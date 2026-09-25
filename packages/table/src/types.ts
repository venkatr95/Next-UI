import type { ReactNode } from "react";
import type { DeviceType } from "@next-ui/utils";
import type { UIStyle } from "@next-ui/utils";

export interface TableColumnConfig {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string | number;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  renderCell?: (value: unknown, row: Record<string, unknown>) => ReactNode;
}

export type SortDirection = "ascending" | "descending";

export interface SortDescriptor {
  column?: string;
  direction?: SortDirection;
}

export type SelectionMode = "none" | "single" | "multiple";

export type TableVariant = "default" | "bordered" | "striped";

export interface TableContextValue {
  columns: TableColumnConfig[];
  sortDescriptor?: SortDescriptor;
  onSortChange?: (descriptor: SortDescriptor) => void;
  selectionMode: SelectionMode;
  selectedKeys: Set<string | number>;
  onSelectionChange?: (keys: Set<string | number>) => void;
  rowKey?: string;
  color?: string;
  variant: TableVariant;
  isStriped: boolean;
  isCompact: boolean;
  isHeaderSticky: boolean;
  deviceType?: DeviceType;
  styleType?: UIStyle;
  visibleColumns: string[];
}
