"use client";

import React from "react";
import { CodeBlock } from "@/components/code-block";

export default function InstallationPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Installation
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Get Next-UI up and running in your Next.js project.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>Node.js 18+</li>
          <li>Next.js 14+</li>
          <li>React 18+</li>
          <li>Tailwind CSS 3.4+</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Install</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Install the core package and any components you need:
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              pnpm
            </p>
            <CodeBlock code="pnpm add @next-ui/core @next-ui/theme @next-ui/utils" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              npm
            </p>
            <CodeBlock code="npm install @next-ui/core @next-ui/theme @next-ui/utils" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              yarn
            </p>
            <CodeBlock code="yarn add @next-ui/core @next-ui/theme @next-ui/utils" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Provider Setup</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Wrap your app with NextUIProvider in your root layout:
        </p>
        <CodeBlock
          code={`import { NextUIProvider } from "@next-ui/core";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider theme={{ mode: "system" }}>
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}`}
          language="tsx"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Tailwind Config</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Add Next-UI packages to your Tailwind content paths:
        </p>
        <CodeBlock
          code={`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@next-ui/*/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: { extend: {} },
  plugins: [],
};`}
          language="js"
        />
      </section>
    </div>
  );
}
