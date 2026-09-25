import type { GradientType } from "@next-ui/utils";

export const gradients: Record<Exclude<GradientType, "none">, string> = {
  sunset: "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600",
  aurora: "bg-gradient-to-r from-green-400 via-cyan-500 to-blue-600",
  ocean: "bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600",
  "purple-glow": "bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500",
};

export function getGradientClasses(gradient?: GradientType): string {
  if (!gradient || gradient === "none") return "";
  return gradients[gradient] ?? "";
}
