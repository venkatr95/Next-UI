import type { UIStyle } from "@next-ui/utils";

const styleMap: Record<UIStyle, string> = {
  minimal: "",
  glass:
    "backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg",
  neumorphic:
    "bg-gray-100 dark:bg-gray-800 shadow-[6px_6px_12px_#b8b9be,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#1a1a2e,-6px_-6px_12px_#2d2d44]",
  brutalist:
    "border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff]",
  bento:
    "rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6",
  skeuomorphic:
    "bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-700 dark:to-gray-900 border border-gray-300 dark:border-gray-600 shadow-md",
  dark:
    "bg-gray-900 text-white border border-gray-700",
  adaptive: "",
};

export function getStyleClasses(style?: UIStyle): string {
  if (!style) return "";
  return styleMap[style] ?? "";
}
