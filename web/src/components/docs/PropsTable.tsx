interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface Props {
  title?: string;
  data: PropRow[];
}

export default function PropsTable({ title = "Props", data }: Props) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
              <th className="text-left px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">Prop</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">Type</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">Default</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-400">Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.name} className="border-b border-zinc-100 dark:border-zinc-800/50 last:border-0">
                <td className="px-4 py-3 font-mono text-primary-600 dark:text-primary-400 text-xs">{row.name}</td>
                <td className="px-4 py-3 font-mono text-amber-600 dark:text-amber-400 text-xs">{row.type}</td>
                <td className="px-4 py-3 font-mono text-zinc-500 text-xs">{row.default || "-"}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
