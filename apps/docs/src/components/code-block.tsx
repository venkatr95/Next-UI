"use client";

import React from "react";
import { Snippet } from "@next-ui/snippet";
import { cn } from "@next-ui/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const lines = code.trim().split("\n");

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700",
        "bg-gray-900 dark:bg-gray-950",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700 bg-gray-800/50 dark:bg-gray-900/50">
        <span className="text-xs font-medium text-gray-400">{language}</span>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-gray-100">
          {showLineNumbers ? (
            <span className="table">
              {lines.map((line, i) => (
                <span key={i} className="table-row">
                  <span className="table-cell pr-4 text-gray-500 select-none w-8 text-right">
                    {i + 1}
                  </span>
                  <span className="table-cell">{line || " "}</span>
                </span>
              ))}
            </span>
          ) : (
            code
          )}
        </code>
      </pre>
    </div>
  );
}
