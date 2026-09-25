"use client";

import React from "react";
import { cn } from "@next-ui/utils";
import { usePlaygroundTheme, STYLE_OPTIONS, PRESET_COLORS } from "@/contexts/playground-theme";
import { GradientEditor } from "@/components/gradient-editor";

export function Toolbar() {
  const {
    mode,
    setMode,
    styleType,
    setStyleType,
    primaryColor,
    setPrimaryColor,
    gradient,
    setGradient,
    deviceSize,
    setDeviceSize,
  } = usePlaygroundTheme();

  return (
    <div className="flex items-center gap-4 flex-wrap p-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      {/* Theme mode toggle */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Theme</span>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setMode("light")}
            className={cn(
              "px-3 py-1.5 text-sm font-medium transition-colors",
              mode === "light"
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => setMode("dark")}
            className={cn(
              "px-3 py-1.5 text-sm font-medium transition-colors",
              mode === "dark"
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Style type selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Style</span>
        <select
          value={styleType}
          onChange={(e) => setStyleType(e.target.value as typeof styleType)}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          {STYLE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Gradient editor */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Gradient</span>
        <GradientEditor value={gradient} onChange={setGradient} />
      </div>

      {/* Primary color picker */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Primary</span>
        <div className="flex items-center gap-1">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setPrimaryColor(color)}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110",
                primaryColor === color ? "border-gray-900 dark:border-white scale-110" : "border-transparent"
              )}
              style={{ backgroundColor: color }}
              aria-label={`Set primary color to ${color}`}
            />
          ))}
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
            aria-label="Pick primary color"
          />
        </div>
      </div>

      {/* Device simulator */}
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Device</span>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {(["mobile", "tablet", "desktop"] as const).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setDeviceSize(size)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors capitalize",
                deviceSize === size
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {size === "mobile" && "📱"}
              {size === "tablet" && "📱"}
              {size === "desktop" && "🖥️"}
              <span className="ml-1">{size}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
