"use client";

import React from "react";
import { CodeBlock } from "@/components/code-block";

export default function ResponsivePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Responsive System
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Device-aware components and utilities for responsive UIs.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">useDeviceType Hook</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Detect the current device type (mobile, tablet, desktop):
        </p>
        <CodeBlock
          code={`import { useDeviceType } from "@next-ui/responsive";

function MyComponent() {
  const { deviceType, width } = useDeviceType();

  return (
    <p>
      Current device: {deviceType}, width: {width}px
    </p>
  );
}`}
          language="tsx"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Responsive Props</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Many components accept responsive values — an object mapping device
          types to values:
        </p>
        <CodeBlock
          code={`<Button
  size={{
    mobile: "sm",
    tablet: "md",
    desktop: "lg",
  }}
>
  Responsive Button
</Button>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">ResponsiveGrid, ResponsiveBox, ResponsiveStack</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Layout components that adapt to screen size:
        </p>
        <CodeBlock
          code={`import {
  ResponsiveGrid,
  ResponsiveBox,
  ResponsiveStack,
} from "@next-ui/responsive";

// Grid with responsive columns
<ResponsiveGrid
  columns={{ mobile: 1, tablet: 2, desktop: 3 }}
  gap={4}
>
  {items.map((item) => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</ResponsiveGrid>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Breakpoints</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Default breakpoints used for device detection:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>
            <strong>mobile</strong> — &lt; 768px
          </li>
          <li>
            <strong>tablet</strong> — 768px – 1024px
          </li>
          <li>
            <strong>desktop</strong> — &gt; 1024px
          </li>
        </ul>
      </section>
    </div>
  );
}
