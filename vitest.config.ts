import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["packages/*/src/**/*.test.{ts,tsx}", "test/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["packages/*/src/**/*.{ts,tsx}"],
      exclude: [
        "packages/*/src/**/*.test.{ts,tsx}",
        "packages/*/src/**/index.ts",
        "packages/tailwind/**",
      ],
    },
    css: false,
  },
  resolve: {
    alias: {
      "@next-ui/utils": path.resolve(__dirname, "packages/utils/src"),
      "@next-ui/theme": path.resolve(__dirname, "packages/theme/src"),
      "@next-ui/core": path.resolve(__dirname, "packages/core/src"),
      "@next-ui/responsive": path.resolve(
        __dirname,
        "packages/responsive/src"
      ),
      "@next-ui/skeleton": path.resolve(__dirname, "packages/skeleton/src"),
      "@next-ui/avatar": path.resolve(__dirname, "packages/avatar/src"),
      "@next-ui/button": path.resolve(__dirname, "packages/button/src"),
    },
  },
});
