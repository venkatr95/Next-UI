"use client";

import React, { useState } from "react";
import { Input } from "@next-ui/input";
import { Textarea } from "@next-ui/textarea";
import { Select, SelectItem } from "@next-ui/select";
import { Checkbox } from "@next-ui/checkbox";
import { Switch } from "@next-ui/switch";
import { Slider } from "@next-ui/slider";

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export default function InputsPage() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Input</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Text input with multiple variants and sizes.
        </p>
        <div className="flex flex-col gap-4 max-w-md">
          <Input variant="flat" placeholder="Flat variant" />
          <Input variant="bordered" placeholder="Bordered variant" />
          <Input variant="underlined" placeholder="Underlined variant" />
          <Input variant="faded" placeholder="Faded variant" />
          <Input label="With label" placeholder="you@example.com" />
          <Input
            label="With icon"
            placeholder="Search..."
            startContent={<SearchIcon />}
          />
          <Input
            label="Error state"
            placeholder="you@example.com"
            isInvalid
            errorMessage="Please enter a valid email"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Textarea</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Multi-line text input for longer content.
        </p>
        <div className="max-w-md">
          <Textarea
            label="Description"
            placeholder="Enter your message..."
            minRows={4}
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Dropdown select for choosing from options.
        </p>
        <div className="max-w-md">
          <Select label="Choose option" placeholder="Select an option">
            <SelectItem itemKey="a">Option A</SelectItem>
            <SelectItem itemKey="b">Option B</SelectItem>
            <SelectItem itemKey="c">Option C</SelectItem>
          </Select>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Checkbox</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Checkbox for binary choices.
        </p>
        <div className="flex flex-col gap-4">
          <Checkbox>Accept terms and conditions</Checkbox>
          <Checkbox defaultSelected>Subscribe to newsletter</Checkbox>
          <Checkbox isDisabled>Disabled checkbox</Checkbox>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Switch</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Toggle switch for on/off states.
        </p>
        <div className="flex flex-wrap gap-6">
          <Switch size="sm" />
          <Switch size="md" defaultSelected />
          <Switch size="lg" />
          <Switch startContent="Enable notifications" defaultSelected />
          <Switch endContent="Dark mode" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Slider</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Range slider for numeric input.
        </p>
        <div className="max-w-md space-y-6">
          <Slider
            label="Volume"
            value={sliderValue}
            onChange={setSliderValue}
            showTooltip
          />
          <Slider
            label="Disabled"
            defaultValue={30}
            isDisabled
          />
        </div>
      </div>
    </div>
  );
}
