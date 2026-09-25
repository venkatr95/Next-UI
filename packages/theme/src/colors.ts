export const colors = {
  default: {
    base: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
    hover: "hover:bg-gray-200 dark:hover:bg-gray-700",
    active: "active:bg-gray-300 dark:active:bg-gray-600",
    border: "border-gray-300 dark:border-gray-600",
  },
  primary: {
    base: "bg-indigo-500 text-white",
    hover: "hover:bg-indigo-600",
    active: "active:bg-indigo-700",
    border: "border-indigo-500",
  },
  secondary: {
    base: "bg-violet-500 text-white",
    hover: "hover:bg-violet-600",
    active: "active:bg-violet-700",
    border: "border-violet-500",
  },
  success: {
    base: "bg-green-500 text-white",
    hover: "hover:bg-green-600",
    active: "active:bg-green-700",
    border: "border-green-500",
  },
  warning: {
    base: "bg-amber-500 text-white",
    hover: "hover:bg-amber-600",
    active: "active:bg-amber-700",
    border: "border-amber-500",
  },
  danger: {
    base: "bg-red-500 text-white",
    hover: "hover:bg-red-600",
    active: "active:bg-red-700",
    border: "border-red-500",
  },
} as const;

export type ColorKey = keyof typeof colors;

export const colorMap = colors;
