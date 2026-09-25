import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Code, Eye } from "lucide-react";
import CodeBlock from "./CodeBlock";

interface Props {
  children: ReactNode;
  code: string;
  title?: string;
  className?: string;
}

export default function Preview({ children, code, title, className }: Props) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div className={cn("rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden mb-8", className)}>
      {title && (
        <div className="px-4 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          {title}
        </div>
      )}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setTab("preview")}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
            tab === "preview"
              ? "border-primary-500 text-primary-600 dark:text-primary-400"
              : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          )}
        >
          <Eye className="h-3.5 w-3.5" />
          Preview
        </button>
        <button
          onClick={() => setTab("code")}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
            tab === "code"
              ? "border-primary-500 text-primary-600 dark:text-primary-400"
              : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          )}
        >
          <Code className="h-3.5 w-3.5" />
          Code
        </button>
      </div>
      {tab === "preview" ? (
        <div className="p-6 flex flex-wrap items-center gap-4 bg-white dark:bg-zinc-950 min-h-[120px]">
          {children}
        </div>
      ) : (
        <CodeBlock code={code} />
      )}
    </div>
  );
}
