"use client";

import React from "react";
import { Button } from "@next-ui/button";

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const ChevronIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function ButtonsPage() {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Variants</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Solid, outline, and ghost button styles.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sizes</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Small, medium, and large button sizes.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Colors</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Semantic color variants for different actions.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button color="default">Default</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="danger">Danger</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Gradients</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Gradient-styled buttons for eye-catching CTAs.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button gradient="sunset">Sunset</Button>
          <Button gradient="aurora">Aurora</Button>
          <Button gradient="ocean">Ocean</Button>
          <Button gradient="purple-glow">Purple Glow</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Style Types</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Glass, neumorphic, and brutalist design styles.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button styleType="glass">Glass</Button>
          <Button styleType="neumorphic">Neumorphic</Button>
          <Button styleType="brutalist">Brutalist</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">With Icons</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Buttons with leading or trailing icons.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button leftIcon={<PlusIcon />}>Add Item</Button>
          <Button rightIcon={<ChevronIcon />}>Next</Button>
          <Button leftIcon={<PlusIcon />} rightIcon={<ChevronIcon />}>
            Both Icons
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">States</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Loading and disabled states.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button fullWidth>Full Width Button</Button>
        </div>
      </div>
    </div>
  );
}
