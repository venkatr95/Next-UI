import * as React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@next-ui/utils";
import { getStyleClasses, colors } from "@next-ui/theme";
import { resolveResponsiveValue, useResponsiveContext } from "@next-ui/responsive";
import type { BaseComponentProps, ResponsiveValue } from "@next-ui/utils";

export type ChartType = "line" | "bar" | "pie" | "area" | "radar" | "scatter";

export interface ChartSeries {
  dataKey: string;
  color?: string;
  name?: string;
}

export interface ChartProps
  extends Omit<BaseComponentProps<HTMLDivElement>, "color" | "styleType">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  type: ChartType;
  data: Record<string, unknown>[];
  xKey?: string;
  yKey?: string;
  series?: ChartSeries[];
  width?: number | string;
  height?: number | string;
  title?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  color?: keyof typeof colors;
  styleType?: ResponsiveValue<string>;
}

const CHART_COLORS = [
  "#6366f1", // indigo-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#f59e0b", // amber-500
  "#10b981", // emerald-500
  "#3b82f6", // blue-500
  "#ef4444", // red-500
  "#14b8a6", // teal-500
];

function getSeriesColor(series: ChartSeries, index: number): string {
  if (series.color) return series.color;
  return CHART_COLORS[index % CHART_COLORS.length];
}

export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      className,
      type,
      data,
      xKey = "name",
      yKey = "value",
      series = [{ dataKey: yKey, name: yKey }],
      width,
      height = 300,
      title,
      showGrid = true,
      showLegend = true,
      showTooltip = true,
      color = "primary",
      styleType,
      ...props
    },
    ref
  ) => {
    const { deviceType } = useResponsiveContext();
    const resolvedStyleType = resolveResponsiveValue(styleType, deviceType);
    const colorClasses = colors[color as keyof typeof colors] ?? colors.primary;

    const chartContent = React.useMemo(() => {
      const commonProps = {
        data,
        margin: { top: 5, right: 20, left: 20, bottom: 5 },
      };

      const grid = showGrid ? <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" /> : null;
      const tooltip = showTooltip ? <Tooltip /> : null;
      const legend = showLegend ? <Legend /> : null;

      switch (type) {
        case "line":
          return (
            <LineChart {...commonProps}>
              {grid}
              <XAxis dataKey={xKey} className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              {tooltip}
              {legend}
              {series.map((s, i) => (
                <Line
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name ?? s.dataKey}
                  stroke={getSeriesColor(s, i)}
                  strokeWidth={2}
                  dot={{ fill: getSeriesColor(s, i) }}
                />
              ))}
            </LineChart>
          );

        case "bar":
          return (
            <BarChart {...commonProps}>
              {grid}
              <XAxis dataKey={xKey} className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              {tooltip}
              {legend}
              {series.map((s, i) => (
                <Bar
                  key={s.dataKey}
                  dataKey={s.dataKey}
                  name={s.name ?? s.dataKey}
                  fill={getSeriesColor(s, i)}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          );

        case "area":
          return (
            <AreaChart {...commonProps}>
              {grid}
              <XAxis dataKey={xKey} className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              {tooltip}
              {legend}
              {series.map((s, i) => (
                <Area
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name ?? s.dataKey}
                  stroke={getSeriesColor(s, i)}
                  fill={getSeriesColor(s, i)}
                  fillOpacity={0.4}
                />
              ))}
            </AreaChart>
          );

        case "pie":
          return (
            <PieChart {...commonProps}>
              {tooltip}
              {legend}
              <Pie
                data={data}
                dataKey={yKey}
                nameKey={xKey}
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label={({ name, percent }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          );

        case "radar":
          return (
            <RadarChart {...commonProps} cx="50%" cy="50%" outerRadius="80%">
              <PolarGrid stroke="currentColor" className="stroke-gray-200 dark:stroke-gray-700" />
              <PolarAngleAxis dataKey={xKey} tick={{ fill: "currentColor" }} />
              <PolarRadiusAxis tick={{ fill: "currentColor" }} />
              <Radar
                name={series[0]?.name ?? yKey}
                dataKey={yKey}
                stroke={getSeriesColor(series[0] ?? { dataKey: yKey }, 0)}
                fill={getSeriesColor(series[0] ?? { dataKey: yKey }, 0)}
                fillOpacity={0.4}
              />
              {tooltip}
              {legend}
            </RadarChart>
          );

        case "scatter":
          return (
            <ScatterChart {...commonProps}>
              {grid}
              <XAxis dataKey={xKey} className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              {tooltip}
              {legend}
              {series.map((s, i) => (
                <Scatter
                  key={s.dataKey}
                  name={s.name ?? s.dataKey}
                  dataKey={s.dataKey}
                  fill={getSeriesColor(s, i)}
                />
              ))}
            </ScatterChart>
          );

        default:
          return null;
      }
    }, [type, data, xKey, yKey, series, showGrid, showLegend, showTooltip]);

    return (
      <div
        ref={ref}
        className={cn("w-full", getStyleClasses(resolvedStyleType as never), className)}
        {...props}
      >
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{title}</h3>
        )}
        <ResponsiveContainer
          width={(width ?? "100%") as number | `${number}%`}
          height={(height ?? 300) as number | `${number}%`}
        >
          {chartContent}
        </ResponsiveContainer>
      </div>
    );
  }
);

Chart.displayName = "Chart";
