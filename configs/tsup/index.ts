import type { Options } from "tsup";

export const baseConfig: Options = {
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: true,
  minify: false,
  external: ["react", "react-dom"],
};
