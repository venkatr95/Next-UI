import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface Props {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function CodeBlock({ code, language = "tsx", showLineNumbers = false, className }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div className={cn("relative group", className)}>
      <button
        onClick={copyToClipboard}
        className="absolute right-3 top-3 z-10 p-1.5 rounded-md bg-zinc-700/50 hover:bg-zinc-600/50 text-zinc-400 hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <div className="overflow-x-auto bg-zinc-950 dark:bg-zinc-900 p-4 text-sm">
        <pre className="font-mono">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {showLineNumbers && (
                  <span className="inline-block w-8 text-right mr-4 text-zinc-600 select-none">
                    {i + 1}
                  </span>
                )}
                <span className="text-zinc-300">{highlightSyntax(line)}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

function highlightSyntax(line: string) {
  return line
    .replace(
      /(import|export|from|const|let|function|return|default|type|interface|extends|class)\b/g,
      '<span class="text-purple-400">$1</span>'
    )
    .replace(
      /(".*?"|'.*?'|`.*?`)/g,
      '<span class="text-green-400">$1</span>'
    )
    .replace(
      /\b(true|false|null|undefined|void)\b/g,
      '<span class="text-amber-400">$1</span>'
    )
    .replace(
      /(\/\/.*$)/gm,
      '<span class="text-zinc-500">$1</span>'
    );
}
