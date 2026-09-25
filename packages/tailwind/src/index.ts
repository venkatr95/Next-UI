import plugin from "tailwindcss/plugin";

export const nextui = () =>
  plugin(
    ({ addBase, addUtilities }) => {
      addBase({
        ":root": {
          "--nextui-primary": "#6366f1",
          "--nextui-secondary": "#8b5cf6",
          "--nextui-accent": "#f59e0b",
          "--nextui-background": "#ffffff",
          "--nextui-foreground": "#0a0a0a",
          "--nextui-muted": "#f4f4f5",
          "--nextui-muted-foreground": "#71717a",
          "--nextui-border": "#e4e4e7",
          "--nextui-ring": "#6366f1",
          "--nextui-radius": "0.5rem",
          "--nextui-shadow": "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          "--nextui-success": "#22c55e",
          "--nextui-warning": "#f59e0b",
          "--nextui-danger": "#ef4444",
        },
        ".dark": {
          "--nextui-primary": "#818cf8",
          "--nextui-secondary": "#a78bfa",
          "--nextui-accent": "#fbbf24",
          "--nextui-background": "#09090b",
          "--nextui-foreground": "#fafafa",
          "--nextui-muted": "#27272a",
          "--nextui-muted-foreground": "#a1a1aa",
          "--nextui-border": "#27272a",
          "--nextui-ring": "#818cf8",
          "--nextui-radius": "0.5rem",
          "--nextui-shadow": "0 1px 3px 0 rgb(0 0 0 / 0.3)",
          "--nextui-success": "#4ade80",
          "--nextui-warning": "#fbbf24",
          "--nextui-danger": "#f87171",
        },
      });

      addUtilities({
        ".nextui-btn": {
          "border-radius": "var(--nextui-radius)",
          "font-weight": "600",
          "transition": "all 150ms ease",
          "padding": "0.5rem 1rem",
        },
        ".nextui-btn-sm": {
          "padding": "0.375rem 0.75rem",
          "font-size": "0.875rem",
        },
        ".nextui-btn-lg": {
          "padding": "0.75rem 1.5rem",
          "font-size": "1.125rem",
        },
        ".nextui-btn-xl": {
          "padding": "1rem 2rem",
          "font-size": "1.25rem",
        },
        ".nextui-card": {
          "border-radius": "var(--nextui-radius)",
          "background": "var(--nextui-background)",
          "border": "1px solid var(--nextui-border)",
          "box-shadow": "var(--nextui-shadow)",
        },
        ".nextui-input": {
          "border-radius": "var(--nextui-radius)",
          "border": "1px solid var(--nextui-border)",
          "padding": "0.5rem 0.75rem",
          "background": "var(--nextui-background)",
          "color": "var(--nextui-foreground)",
        },
      });
    },
    {
      theme: {
        extend: {
          colors: {
            "nextui-primary": "var(--nextui-primary)",
            "nextui-secondary": "var(--nextui-secondary)",
            "nextui-accent": "var(--nextui-accent)",
            "nextui-background": "var(--nextui-background)",
            "nextui-foreground": "var(--nextui-foreground)",
            "nextui-muted": "var(--nextui-muted)",
            "nextui-muted-foreground": "var(--nextui-muted-foreground)",
            "nextui-border": "var(--nextui-border)",
            "nextui-success": "var(--nextui-success)",
            "nextui-warning": "var(--nextui-warning)",
            "nextui-danger": "var(--nextui-danger)",
          },
          borderRadius: {
            nextui: "var(--nextui-radius)",
          },
          boxShadow: {
            nextui: "var(--nextui-shadow)",
          },
        },
      },
    }
  );

export default nextui;
