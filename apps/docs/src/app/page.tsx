"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@next-ui/button";
import { Card, CardHeader, CardBody } from "@next-ui/card";
import { Snippet } from "@next-ui/snippet";
import { CodeBlock } from "@/components/code-block";

const features = [
  { title: "50+ Components", desc: "Rich component library for every use case" },
  { title: "Responsive API", desc: "Device-aware props and breakpoints" },
  { title: "Gradient Engine", desc: "Beautiful gradients out of the box" },
  { title: "Light/Dark Mode", desc: "Built-in theme switching" },
  { title: "Multiple UI Styles", desc: "Minimal, glass, and more" },
  { title: "Tailwind Integration", desc: "Works seamlessly with Tailwind CSS" },
];

const quickStartCode = `import { NextUIProvider } from "@next-ui/core";
import { Button } from "@next-ui/button";

export default function App() {
  return (
    <NextUIProvider>
      <Button color="primary">Click me</Button>
    </NextUIProvider>
  );
}`;

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 md:p-16 lg:p-20 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.08\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Next-UI
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl">
            A modern UI component ecosystem for Next.js
          </p>
          <div className="mt-8">
            <Snippet
              codeString="npm install @next-ui/core"
              variant="bordered"
              size="lg"
              className="bg-white/10 border-white/30 text-white"
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/docs/installation">
              <Button
                color="primary"
                size="lg"
                className="bg-white text-indigo-600 hover:bg-white/90"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/docs/components/button">
              <Button
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white/10"
              >
                Components
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Why Next-UI?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card key={f.title} isHoverable className="transition-all">
              <CardHeader className="pb-2">
                <h3 className="text-lg font-semibold">{f.title}</h3>
              </CardHeader>
              <CardBody className="pt-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {f.desc}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick start */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Quick Start
        </h2>
        <CodeBlock code={quickStartCode} language="tsx" />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/docs/installation"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View full installation guide →
          </Link>
        </p>
      </section>
    </div>
  );
}
