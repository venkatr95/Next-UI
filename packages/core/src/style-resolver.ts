import { getStyleClasses } from "@next-ui/theme";
import { getGradientClasses } from "@next-ui/theme";
import { cn } from "@next-ui/utils";
import type { UIStyle, GradientType } from "@next-ui/utils";

export class StyleResolver {
  static resolve(opts: {
    styleType?: UIStyle;
    gradient?: GradientType;
    className?: string;
    baseClasses?: string;
  }): string {
    return cn(
      opts.baseClasses,
      getStyleClasses(opts.styleType),
      getGradientClasses(opts.gradient),
      opts.className
    );
  }
}
