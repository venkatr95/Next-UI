"use client";

import React from "react";
import { CodeBlock } from "@/components/code-block";

export default function ThemePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Theme
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Customize appearance with theme modes, CSS variables, and style types.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Theme Modes</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Next-UI supports three theme modes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
          <li>
            <strong>light</strong> — Always use light theme
          </li>
          <li>
            <strong>dark</strong> — Always use dark theme
          </li>
          <li>
            <strong>system</strong> — Follow OS preference (default)
          </li>
        </ul>
        <CodeBlock
          code={`<NextUIProvider theme={{ mode: "dark" }}>
  <App />
</NextUIProvider>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">CSS Variables</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Theme tokens are exposed as CSS variables on the root element:
        </p>
        <CodeBlock
          code={`:root {
  --nextui-primary: #6366f1;
  --nextui-background: #ffffff;
  --nextui-foreground: #0f172a;
}

.dark {
  --nextui-primary: #818cf8;
  --nextui-background: #0f172a;
  --nextui-foreground: #f8fafc;
}`}
          language="css"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Custom Theme Tokens</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Override default tokens via the theme prop:
        </p>
        <CodeBlock
          code={`<NextUIProvider
  theme={{
    mode: "light",
    primary: "#8b5cf6",
    tokens: {
      radius: "0.75rem",
      // ...other tokens
    },
  }}
>
  <App />
</NextUIProvider>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Style Types</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Components support different visual styles:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
          <li>
            <strong>minimal</strong> — Clean, flat design (default)
          </li>
          <li>
            <strong>glass</strong> — Frosted glass effect with backdrop blur
          </li>
          <li>
            <strong>bordered</strong> — Emphasized borders
          </li>
        </ul>
        <CodeBlock
          code={`<NextUIProvider theme={{ style: "glass" }}>
  <Button styleType="glass">Glass Button</Button>
</NextUIProvider>`}
          language="tsx"
        />
      </section>
    </div>
  );
}
