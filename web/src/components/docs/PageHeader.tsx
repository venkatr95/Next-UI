interface Props {
  title: string;
  description: string;
  badge?: string;
}

export default function PageHeader({ title, description, badge }: Props) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {badge && (
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
            {badge}
          </span>
        )}
      </div>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
