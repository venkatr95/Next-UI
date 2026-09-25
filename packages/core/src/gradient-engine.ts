import { getGradientClasses } from "@next-ui/theme";
import type { GradientType } from "@next-ui/utils";

export class GradientEngine {
  static resolve(gradient?: GradientType): string {
    return getGradientClasses(gradient);
  }

  static getTextGradient(gradient?: GradientType): string {
    if (!gradient || gradient === "none") return "";
    const base = getGradientClasses(gradient);
    return `${base} bg-clip-text text-transparent`;
  }
}
