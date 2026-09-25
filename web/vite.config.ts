import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

const packagesDir = path.resolve(__dirname, "../packages");
const packageNames = fs.readdirSync(packagesDir).filter((name) => {
  const pkgPath = path.join(packagesDir, name, "package.json");
  return fs.existsSync(pkgPath);
});

const packageAliases: Record<string, string> = {};
for (const name of packageNames) {
  packageAliases[`@next-ui/${name}`] = path.resolve(packagesDir, name, "src");
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      ...packageAliases,
    },
  },
});
