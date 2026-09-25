"use client";

import React from "react";
import { Button } from "@next-ui/button";
import { CodeBlock } from "@/components/code-block";
import { Divider } from "@next-ui/divider";

export default function ButtonPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Button
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          A versatile button component with variants, sizes, and colors.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Import</h2>
        <CodeBlock code='import { Button } from "@next-ui/button";' language="tsx" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Basic Usage</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button>Default</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="danger">Danger</Button>
        </div>
        <CodeBlock
          code={`<Button>Default</Button>
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Variants</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button variant="solid" color="primary">
            Solid
          </Button>
          <Button variant="outline" color="primary">
            Outline
          </Button>
          <Button variant="ghost" color="primary">
            Ghost
          </Button>
        </div>
        <CodeBlock
          code={`<Button variant="solid" color="primary">Solid</Button>
<Button variant="outline" color="primary">Outline</Button>
<Button variant="ghost" color="primary">Ghost</Button>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button size="sm" color="primary">
            Small
          </Button>
          <Button size="md" color="primary">
            Medium
          </Button>
          <Button size="lg" color="primary">
            Large
          </Button>
        </div>
        <CodeBlock
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">States</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          <Button loading color="primary">
            Loading
          </Button>
          <Button disabled color="primary">
            Disabled
          </Button>
        </div>
        <CodeBlock
          code={`<Button loading color="primary">Loading</Button>
<Button disabled color="primary">Disabled</Button>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Props</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-3 font-mono">variant</td>
                <td className="px-4 py-3">solid | outline | ghost</td>
                <td className="px-4 py-3">solid</td>
                <td className="px-4 py-3">Visual style</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">size</td>
                <td className="px-4 py-3">sm | md | lg</td>
                <td className="px-4 py-3">md</td>
                <td className="px-4 py-3">Button size</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">color</td>
                <td className="px-4 py-3">primary | secondary | ...</td>
                <td className="px-4 py-3">default</td>
                <td className="px-4 py-3">Color theme</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">loading</td>
                <td className="px-4 py-3">boolean</td>
                <td className="px-4 py-3">false</td>
                <td className="px-4 py-3">Show loading spinner</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">disabled</td>
                <td className="px-4 py-3">boolean</td>
                <td className="px-4 py-3">false</td>
                <td className="px-4 py-3">Disable interaction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
