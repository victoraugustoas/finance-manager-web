---
name: create-component
description: Scaffold a new UI component following the Pluma design system. Reads DESIGN.md, consults MUI v9 docs via MCP, and mirrors existing component patterns. Usage: /project:create-component <ComponentName> [brief description]
---

# Create UI Component

Scaffold a new UI component for: **$ARGUMENTS**

## Step 1 — Research in parallel

Launch **2 agents simultaneously** before writing any code:

### Agent 1 — Codebase (subagent_type: Explore)

Prompt:

> Read the following files from the project at the current working directory and report their full contents:
>
> 1. `DESIGN.md` (at the root)
> 2. `src/components/IncomeRow/IncomeRow.tsx`
> 3. `src/components/CardAccount/CardAccount.tsx`
>
> Report: all design tokens found in DESIGN.md (colors, typography, spacing, border-radius, shadows) AND the full source of the two component files so the structural patterns are clear.

### Agent 2 — MUI Docs (subagent_type: general-purpose)

Prompt:

> You need to identify the most appropriate MUI v9 base component to use when building: **$ARGUMENTS**
>
> Steps:
>
> 1. Call `mcp__mui-mcp__useMuiDocs` with `urlList: ["https://llms.mui.com/material-ui/9.0.1/llms.txt"]` to get the component index.
> 2. From the index, identify the URL(s) of the most relevant MUI component(s) for this request.
> 3. Call `mcp__mui-mcp__fetchDocs` with those URL(s) to get the full API.
>
> Report back:
>
> - Which MUI component(s) to use and why
> - The exact import path (e.g. `import Card from '@mui/material/Card'`)
> - The key props to use
> - Any important sx customization notes

---

## Step 2 — Derive identifiers

Extract the PascalCase component name from `$ARGUMENTS` (use only the name part, ignore the description).

| Identifier      | Rule                                       | Example (`$ARGUMENTS` = `TransactionCard`)                   |
| --------------- | ------------------------------------------ | ------------------------------------------------------------ |
| Component name  | PascalCase                                 | `TransactionCard`                                            |
| Props interface | `{Name}Props`                              | `TransactionCardProps`                                       |
| Folder          | `src/components/{Name}/`                   | `src/components/TransactionCard/`                            |
| Main file       | `src/components/{Name}/{Name}.tsx`         | `src/components/TransactionCard/TransactionCard.tsx`         |
| Hook (optional) | `src/components/{Name}/hooks/use{Name}.ts` | `src/components/TransactionCard/hooks/useTransactionCard.ts` |

---

## Step 3 — Create the component file

Create `src/components/{Name}/{Name}.tsx` following these rules:

### File structure

```tsx
[imports — MUI, Lucide, hooks]

export interface {Name}Props {
  // typed props
}

export function {Name}({ ... }: {Name}Props) {
  [optional hooks]

  [optional skeleton guard — see Step 4]

  return (...)
}
```

### Imports

- MUI components imported individually by path: `import Card from '@mui/material/Card'`
- MUI types with `import type`: `import type { SxProps } from '@mui/material'`
- Lucide icons: `import { TrendingUp } from 'lucide-react'` — pass as `icon: LucideIcon` prop when flexible
- `useTheme` from `@mui/material/styles` when palette colors are needed outside of `sx`
- `useMediaQuery` from `@mui/material` only when conditional **JSX** (not just style) depends on a breakpoint

### Props

- Define `{Name}Props` interface at the top and **export** it
- Type all props strictly — no `any`
- Use `LucideIcon` type for icon props: `import type { LucideIcon } from 'lucide-react'`

### Named export, no barrel

- Use `export function {Name}` (named, not default)
- Do **not** create an `index.ts` barrel file

---

## Styling rules

All styles go through the MUI `sx` prop. No CSS modules, no styled-components, no inline `style` objects.

### ❌ Never do

- **Hardcode hex colors**: `bgcolor: '#ece5d6'`, `color: '#3d6b4f'` — always use palette tokens
- **Hardcode px values in sx**: `borderRadius: '12px'`, `gap: '14px'` — always use theme tokens
- **Use fractional spacing**: `gap: 1.75`, `p: 2.5` — pick the nearest integer in the Pluma scale
- **Use `!important`**: fight specificity through theme overrides and sx, never with `!important`
- **Inline font properties**: `fontFamily`, `fontWeight`, `fontSize`, `letterSpacing`, `fontFeatureSettings` — use typography variants instead
- **Import `plumaColors`, `plumaRounded`, or `plumaSpacing` directly** into components — use only what's exposed in the MUI theme

### Colors in `sx` — use palette token paths

```tsx
// surfaces
bgcolor: 'background.paper' // card surface (#fffdf8)
bgcolor: 'background.surfaceInset' // inset / well (#ece5d6)
bgcolor: 'background.default' // page canvas (#f6f2ea)

// text
color: 'text.primary'
color: 'text.secondary'
color: 'text.disabled'

// semantic
color: 'primary.main'
color: 'success.main' // positive / income
color: 'error.main' // negative / expense
```

### Colors in JS config objects — use `useTheme()`

When a color must be a plain string (e.g. passed as a prop to a child component or used in a runtime config object), resolve it from the theme:

```tsx
const theme = useTheme()

const config = {
  income: { iconBg: theme.palette.success.main, amountColor: theme.palette.success.main },
  expense: { iconBg: theme.palette.error.main, amountColor: theme.palette.text.primary },
  transfer: {
    iconBg: theme.palette.categoryColors.transport,
    amountColor: theme.palette.text.secondary,
  },
}
```

### Spacing — Pluma scale (1=4px … 8=64px)

The theme registers `spacing(n)` as the Pluma array. Use **integers only** in `sx`:

| Index | Result |
| ----- | ------ |
| `1`   | 4px    |
| `2`   | 8px    |
| `3`   | 12px   |
| `4`   | 16px   |
| `5`   | 24px   |
| `6`   | 32px   |
| `7`   | 48px   |
| `8`   | 64px   |

When a desired value (e.g. 14px, 20px, 28px) falls between two tokens, choose the nearest one. Never use fractions.

### Border radius — `t.shape.rounded.*`

Use a theme callback in `sx` to access rounded tokens:

```tsx
sx={(t) => ({ borderRadius: t.shape.rounded.lg })}
```

| Token                     | Value   | Use for                    |
| ------------------------- | ------- | -------------------------- |
| `t.shape.rounded.sm`      | 6px     | Chips, badges              |
| `t.shape.rounded.md`      | 12px    | Inputs, small cards        |
| `t.shape.rounded.lg`      | 18px    | Main cards                 |
| `t.shape.rounded.xl`      | 28px    | Sheets, large modals       |
| `t.shape.rounded.pill`    | 999px   | Pills, tags                |
| `t.shape.rounded.navItem` | 10px    | Nav items, icon containers |
| `t.shape.rounded.icon`    | 8px     | Icon chips                 |
| `t.shape.rounded.circle`  | `'50%'` | Circular dots, avatars     |

### Typography — use variants, never inline font properties

| Variant                  | Use for                                                    |
| ------------------------ | ---------------------------------------------------------- |
| `variant="h1"`           | Page headings (24px, 600)                                  |
| `variant="h2"`           | Card headings, responsive (1rem xs → 1.25rem sm)           |
| `variant="body1"`        | Primary body text (16px)                                   |
| `variant="body2"`        | Secondary / smaller body text (14px)                       |
| `variant="caption"`      | Labels, metadata (12px)                                    |
| `variant="displayMoney"` | Hero monetary values (Fraunces, 42px → 56px responsive)    |
| `variant="labelSm"`      | Action buttons, row labels (13px, weight 500)              |
| `variant="amountSm"`     | Compact monetary amounts in lists (13px, weight 600, tnum) |

For Inter: no explicit `fontFamily` needed — it is the theme default.

**Responsive breakpoints:** use `{ xs: ..., sm: ..., md: ... }` inside `sx` for breakpoint-aware values. The h2 variant is already responsive via the theme — no additional sx override needed.

---

## Step 4 — Skeleton for components with data fetching

If the component fetches data through a hook that returns `isLoading`, show skeletons only for dynamic content. The card shell and static labels remain visible during loading.

```tsx
import Skeleton from '@mui/material/Skeleton'

export function {Name}({ ... }: {Name}Props) {
  const { data, isLoading } = use{Name}()

  return (
    <Card>
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Typography variant="caption" component="div" sx={{ mb: 1 }}>
          rótulo estático
        </Typography>

        {isLoading ? (
          <Skeleton
            variant="text"
            width="70%"
            sx={(theme) => ({
              ...theme.typography.displayMoney,
              bgcolor: 'background.surfaceInset',
            })}
          />
        ) : (
          <Typography variant="displayMoney" component="div" color="text.primary">
            {value}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
```

**Skeleton rules:**

- `bgcolor: 'background.surfaceInset'` — always; never hex
- **Text skeletons** — spread the matching typography variant to get the correct height automatically:
  ```tsx
  sx={(t) => ({ ...t.typography.body2,    bgcolor: 'background.surfaceInset' })}
  sx={(t) => ({ ...t.typography.caption,  bgcolor: 'background.surfaceInset' })}
  sx={(t) => ({ ...t.typography.labelSm,  bgcolor: 'background.surfaceInset' })}
  sx={(t) => ({ ...t.typography.amountSm, bgcolor: 'background.surfaceInset' })}
  sx={(t) => ({ ...t.typography.displayMoney, bgcolor: 'background.surfaceInset' })}
  ```
- **Rounded/block skeletons** — use `t.shape.rounded.*` for border radius:
  ```tsx
  sx={(t) => ({ borderRadius: t.shape.rounded.navItem, bgcolor: 'background.surfaceInset' })}
  sx={(t) => ({ borderRadius: t.shape.rounded.lg,      bgcolor: 'background.surfaceInset' })}
  ```
- For list components: render 2–3 skeleton rows to simulate real content

---

## Step 5 — Create hook (only if needed)

Create `src/components/{Name}/hooks/use{Name}.ts` **only** if the component needs:

- Data from a repository (call the appropriate `use{Entity}Repository` hook)
- Non-trivial local state that warrants extraction

If the component is purely presentational, skip this file.

---

## Style rules (all files)

- No semicolons
- Single quotes for strings
- Trailing commas in multi-line structures
- 2-space indentation
- Max 100 characters per line
- No inline comments unless the logic is non-obvious

---

## Step 6 — Confirm output

List the created file paths and run `npx tsc --noEmit` to confirm no TypeScript errors.
