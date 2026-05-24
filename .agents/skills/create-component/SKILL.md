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
> 2. `src/components/CardTotalBalance/CardTotalBalance.tsx`
> 3. `src/components/IncomeRow/IncomeRow.tsx`
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

Create `src/components/{Name}/{Name}.tsx` following these rules derived from the codebase agent's findings:

### File structure

```tsx
[imports — MUI, Lucide, hooks]

export interface {Name}Props {
  // typed props
}

[optional helper functions, e.g. fmtMoney]

export function {Name}({ ... }: {Name}Props) {
  [optional hooks]

  [optional skeleton guard — see below]

  return (...)
}
```

### Imports

- MUI components imported individually by path: `import Card from '@mui/material/Card'`
- MUI types with `import type`: `import type { SxProps } from '@mui/material'`
- Lucide icons: `import { TrendingUp } from 'lucide-react'` — pass as `icon: LucideIcon` prop when flexible
- `useTheme` and `useMediaQuery` from `@mui/material/styles` when responsive logic is needed

### Props

- Define `{Name}Props` interface at the top and **export** it
- Type all props strictly — no `any`
- Use `LucideIcon` type for icon props when applicable: `import type { LucideIcon } from 'lucide-react'`

### Styling

All styles go through the MUI `sx` prop. No CSS modules, no styled-components.

**Pluma design tokens to use:**

| Token         | Value              | Usage                                                     |
| ------------- | ------------------ | --------------------------------------------------------- |
| Primary       | `#3d6b4f`          | Moss green — primary actions, active states, accent icons |
| Primary hover | `#325a41`          | Hover on primary                                          |
| Primary soft  | `#eef3eb`          | Soft background for primary                               |
| Canvas        | `#f6f2ea`          | Page background                                           |
| Card surface  | `#faf7f2`          | Card backgrounds                                          |
| Elevated      | `#ffffff`          | Elevated cards, modals                                    |
| Inset         | `#ede8de`          | Inset/well backgrounds                                    |
| Ink primary   | `#1a1a18`          | Main text                                                 |
| Ink secondary | `#5c5a54`          | Secondary text                                            |
| Ink tertiary  | `#9c9a94`          | Hints, placeholders                                       |
| Positive      | `#2d6a4f`          | Income, positive amounts                                  |
| Negative      | `#8b2e2e`          | Expense, negative amounts                                 |
| Border        | `rgba(0,0,0,0.08)` | Dividers, borders                                         |

**Spacing scale (use px values directly):** 4, 8, 12, 16, 24, 32, 48, 64

**Border radius:** sm=6px, md=12px, lg=18px, xl=28px, pill=999px, nav-item=10px, icon=8px

**Typography:**

- Financial display numbers (balances, totals): `fontFamily: '"Fraunces", Georgia, serif'` + `fontFeatureSettings: '"tnum" 1'`
- All other text: Inter (default theme font, no explicit fontFamily needed)
- Money amounts in lists: `fontFeatureSettings: '"tnum" 1'` even in Inter

**Responsive:** use `{ xs: ..., sm: ..., md: ... }` syntax inside `sx` for breakpoint-aware values. Use `useMediaQuery(theme.breakpoints.down('sm'))` only when conditional JSX (not just style) depends on the breakpoint.

### Named export, no barrel

- Use `export function {Name}` (named, not default)
- Do **not** create an `index.ts` barrel file

---

## Step 4 — Skeleton for components with data fetching

If the component fetches data through a hook that returns `isLoading`:

```tsx
import Skeleton from '@mui/material/Skeleton'

export function {Name}({ ... }: {Name}Props) {
  const { data, isLoading } = use{Name}()

  return (
    <Card>
      <CardContent>
        <Typography variant="caption">static label</Typography>

        {isLoading ? (
          <Skeleton variant="text" width="70%" sx={{ fontSize: '2rem', bgcolor: '#ede8de' }} />
        ) : (
          <Typography>...</Typography>
        )}
      </CardContent>
    </Card>
  )
}
```

**Skeleton rules:**

- The skeleton replaces **only dynamically loaded content** — static labels, titles, and the card shell remain visible during loading
- `variant="text"` for numeric or text values: use `sx={{ fontSize }}` matching the real text so the skeleton height mirrors it
- `variant="rounded"` for whole image or block placeholders
- `variant="circular"` for icon containers and avatars
- `sx={{ bgcolor: '#ede8de' }}` to blend with the Pluma canvas
- For list components: render 2–3 skeleton items to simulate real content, not just one

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
