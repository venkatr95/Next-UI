import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface Props {
  packageName: string;
}

const managers = [
  { id: "npm", prefix: "npm install" },
  { id: "pnpm", prefix: "pnpm add" },
  { id: "yarn", prefix: "yarn add" },
  { id: "bun", prefix: "bun add" },
] as const;

export default function InstallSnippet({ packageName }: Props) {
  const [active, setActive] = useState<string>("npm");
  const [copied, setCopied] = useState(false);

  const manager = managers.find((m) => m.id === active)!;
  const command = `${manager.prefix} ${packageName}`;

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden mb-6">
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        {managers.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={cn(
              "px-4 py-2 text-xs font-medium transition-colors border-b-2 -mb-px",
              active === m.id
                ? "border-primary-500 text-primary-600 dark:text-primary-400"
                : "border-transparent text-zinc-500 hover:text-zinc-700"
            )}
          >
            {m.id}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 dark:bg-zinc-900">
        <code className="font-mono text-sm text-zinc-300">{command}</code>
        <button onClick={copy} className="p-1.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300">
          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
