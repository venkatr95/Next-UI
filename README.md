# Next-UI Component Ecosystem

A modern, responsive UI component ecosystem for Next.js + TypeScript applications.

## Features

- **50+ Components** — Buttons, Cards, Modals, Tables, Charts, and more
- **Responsive Device API** — Built-in `useDeviceType()` hook and responsive prop system
- **Multiple UI Styles** — Minimal, Glass, Neumorphic, Brutalist, Bento, Skeuomorphic, Dark, Adaptive
- **Gradient Engine** — Built-in gradient presets (sunset, aurora, ocean, purple-glow)
- **Light / Dark Mode** — System-aware theme with CSS variables
- **Tailwind CSS Integration** — Custom Tailwind plugin with design tokens
- **Headless Architecture** — Composable, accessible components
- **Modular Distribution** — Install only what you need

## Quick Start

```bash
# Install core and any components you need
npm install @next-ui/core @next-ui/button @next-ui/card
```

```tsx
import { NextUIProvider } from "@next-ui/core";
import { Button } from "@next-ui/button";

export default function App() {
  return (
    <NextUIProvider
      theme={{
        mode: "dark",
        style: "glass",
        primary: "#7c3aed",
      }}
    >
      <Button gradient="sunset" size="lg">
        Get Started
      </Button>
    </NextUIProvider>
  );
}
```

## Technology Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16, React 19 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 |
| Build | tsup (ESM + CJS + Types) |
| Monorepo | Turborepo + npm workspaces |
| Storybook | Storybook 10 + Vite |
| Testing | Vitest 5 + React Testing Library |

## Monorepo Structure

```
next-ui/
├── apps/
│   ├── playground/        # Interactive component playground
│   └── docs/              # Documentation site
├── packages/
│   ├── core/              # NextUIProvider, context, engines
│   ├── theme/             # Theme tokens, gradients, styles
│   ├── responsive/        # Device detection, responsive layouts
│   ├── tailwind/          # Tailwind CSS plugin
│   ├── utils/             # Shared utilities (cn, types)
│   ├── button/            # @next-ui/button
│   ├── card/              # @next-ui/card
│   ├── input/             # @next-ui/input
│   ├── modal/             # @next-ui/modal
│   ├── table/             # @next-ui/table
│   ├── chart/             # @next-ui/chart
│   └── ... (50+ components)
├── storybook/             # Storybook stories
├── configs/               # Shared TypeScript, tsup configs
└── tooling/               # Build tooling
```

## All Components

### Core Packages
`@next-ui/core` · `@next-ui/theme` · `@next-ui/responsive` · `@next-ui/tailwind` · `@next-ui/utils`

### Form Components
`@next-ui/input` · `@next-ui/textarea` · `@next-ui/number-input` · `@next-ui/checkbox` · `@next-ui/checkbox-group` · `@next-ui/radio-group` · `@next-ui/select` · `@next-ui/autocomplete` · `@next-ui/switch` · `@next-ui/slider` · `@next-ui/date-picker` · `@next-ui/date-range-picker` · `@next-ui/date-input` · `@next-ui/time-input` · `@next-ui/input-otp` · `@next-ui/form`

### Data Display
`@next-ui/table` · `@next-ui/chart` · `@next-ui/avatar` · `@next-ui/badge` · `@next-ui/chip` · `@next-ui/code` · `@next-ui/kbd` · `@next-ui/snippet` · `@next-ui/user` · `@next-ui/image` · `@next-ui/listbox`

### Feedback
`@next-ui/spinner` · `@next-ui/skeleton` · `@next-ui/progress` · `@next-ui/circular-progress` · `@next-ui/alert` · `@next-ui/toast`

### Navigation
`@next-ui/navbar` · `@next-ui/tabs` · `@next-ui/breadcrumbs` · `@next-ui/link` · `@next-ui/pagination`

### Layout
`@next-ui/card` · `@next-ui/divider` · `@next-ui/spacer` · `@next-ui/scroll-shadow` · `@next-ui/accordion`

### Overlay
`@next-ui/modal` · `@next-ui/drawer` · `@next-ui/popover` · `@next-ui/tooltip` · `@next-ui/dropdown`

### Date & Time
`@next-ui/calendar` · `@next-ui/range-calendar` · `@next-ui/date-picker` · `@next-ui/date-range-picker` · `@next-ui/date-input` · `@next-ui/time-input`

## Responsive System

Every component supports the responsive device API:

```tsx
// Auto-detect device type
<Button size={{ mobile: "sm", tablet: "md", desktop: "lg" }}>
  Responsive Button
</Button>

// Force a specific device type
<Button deviceType="mobile" size="sm">
  Mobile Button
</Button>

// Use the hook
const { deviceType, width } = useDeviceType();
```

### Responsive Layout Components

```tsx
<ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 4 }}>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</ResponsiveGrid>
```

## Theme System

```tsx
<NextUIProvider
  theme={{
    mode: "dark",        // "light" | "dark" | "system"
    style: "glass",      // UIStyle
    primary: "#6366f1",  // Primary color override
    tokens: {            // Custom tokens
      radius: "1rem",
      shadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
  }}
>
```

### CSS Variables

```css
--nextui-primary
--nextui-secondary
--nextui-accent
--nextui-background
--nextui-foreground
--nextui-radius
--nextui-shadow
```

## UI Styles

| Style | Use Case |
|-------|----------|
| `minimal` | Default clean UI |
| `glass` | Cards, modals with glassmorphism |
| `neumorphic` | Buttons, inputs with soft shadows |
| `brutalist` | Experimental bold layouts |
| `bento` | Dashboard grid layouts |
| `skeuomorphic` | Realistic UI elements |
| `dark` | Dark-themed components |
| `adaptive` | Auto-adapts to context |

## Run the app

The interactive app is the playground in `apps/playground`. It needs Node.js 22.12 or newer.

```bash
npm install
npm run build
npm run playground
```

Open [http://localhost:3001](http://localhost:3001).

`npm run build` compiles the component packages once. The playground imports those built files, so run the build before the first start and again after you change a package.

### Docs and Storybook

```bash
npm run docs
```

Documentation site: [http://localhost:3002](http://localhost:3002).

```bash
npm run storybook
```

Component stories: [http://localhost:6006](http://localhost:6006).

### Tests

```bash
npm test
```

`npm run dev` watches every package and starts the apps together. Build once before that first dev session.

## Tailwind Integration

```ts
// tailwind.config.ts
import { nextui } from "@next-ui/tailwind";

export default {
  plugins: [nextui()],
};
```

## Publishing

Each component is published individually:

```bash
npm publish --access public
```

Install any component:

```bash
npm install @next-ui/button
npm install @next-ui/card
npm install @next-ui/modal
```

## License

MIT
