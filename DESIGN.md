---
version: alpha
name: Pluma
description: A warm-paper personal finance canvas built around analogue calm and
  honest structure. A single moss-green accent carries every primary action and
  positive signal against bege-paper surfaces. Display numbers run in Fraunces —
  humanist and unhurried. Body UI stays in Inter, tight and legible. No
  blue-purple gradient, no aggressive shadow, no alarm-red on ordinary expenses.
  Feels like a well-kept financial notebook, not a bank dashboard.

colors:
  primary: "#3d6b4f"
  primary-hover: "#2a4a37"
  primary-soft: "#dde8df"
  on-primary: "#fbf8f2"
  canvas: "#f6f2ea"
  surface: "#fbf8f2"
  surface-card: "#fffdf8"
  surface-elevated: "#ffffff"
  surface-inset: "#ece5d6"
  ink: "#1a1815"
  ink-secondary: "#4a463e"
  ink-tertiary: "#807a6c"
  hairline: "rgba(26, 24, 21, 0.08)"
  hairline-strong: "rgba(26, 24, 21, 0.16)"
  divider: "rgba(26, 24, 21, 0.06)"
  positive: "#3d6b4f"
  positive-soft: "#dde8df"
  negative: "#c46a4e"
  negative-soft: "#f5d9cf"
  warning: "#c89a2b"
  warning-soft: "#f5e2b8"
  cat-grocery: "#7a9b5e"
  cat-transport: "#4f7a9b"
  cat-home: "#9b6f4f"
  cat-leisure: "#b87a9b"
  cat-health: "#5e9b9b"
  cat-food: "#c47a4e"
  cat-salary: "#3d6b4f"
  cat-other: "#807a6c"

typography:
  display-1:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -0.02em
  display-2:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: 40px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -0.018em
  display-3:
    fontFamily: "'Fraunces', Georgia, serif"
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: -0.015em
  heading-1:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
  heading-2:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.005em
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  meta:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0.01em
  button:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  money-display:
    fontFamily: "'Fraunces', Georgia, serif"
    fontWeight: 500
    fontFeatureSettings: '"tnum" 1, "cv11" 1'
    letterSpacing: -0.01em
  money-ui:
    fontFamily: "Inter, system-ui, sans-serif"
    fontWeight: 600
    fontFeatureSettings: '"tnum" 1'

rounded:
  sm: 6px
  md: 12px
  lg: 18px
  xl: 28px
  pill: 999px
  nav-item: 10px
  icon: 8px

spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 24px
  6: 32px
  7: 48px
  8: 64px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: 44px
    padding: "0 18px"
    hoverBackground: "{colors.primary-hover}"
    activeTransform: scale(0.98)
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: 44px
    padding: "0 18px"
    border: "1px solid {colors.hairline-strong}"
    hoverBackground: "rgba(26, 24, 21, 0.04)"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: 44px
    padding: "0 18px"
    hoverBackground: "rgba(26, 24, 21, 0.04)"
  card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    boxShadow: "0 1px 2px rgba(26,24,21,0.04), 0 8px 24px -8px rgba(26,24,21,0.08)"
    paddingMobile: "{spacing.4}"
    paddingDesktop: "{spacing.5}"
  input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: 44px
    padding: "0 14px"
    border: "1px solid {colors.hairline-strong}"
    focusBorderColor: "{colors.primary}"
    focusRing: "0 0 0 3px {colors.primary-soft}"
  chip:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    height: 28px
    padding: "0 10px"
    border: "1px solid {colors.hairline}"
  chip-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    height: 28px
    padding: "0 10px"
  transaction-row:
    paddingVertical: "{spacing.3}"
    divider: "1px solid {colors.divider}"
    iconSize: 36px
    iconRadius: "{rounded.icon}"
    nameTypography: "{typography.body-sm}"
    nameWeight: 600
    metaTypography: "{typography.meta}"
    metaColor: "{colors.ink-tertiary}"
    amountTypography: "{typography.money-ui}"
    incomeColor: "{colors.positive}"
    expenseColor: "{colors.ink}"
  sidebar-item:
    backgroundColor: transparent
    textColor: "{colors.ink-secondary}"
    typography: "{typography.body-sm}"
    fontWeight: 500
    rounded: "{rounded.nav-item}"
    padding: "10px 12px"
    iconSize: 18px
    gap: "{spacing.3}"
  sidebar-item-active:
    backgroundColor: "rgba(61, 107, 79, 0.12)"
    textColor: "{colors.primary-hover}"
    fontWeight: 600
  bottom-tab-bar:
    backgroundColor: "rgba(255, 253, 248, 0.88)"
    backdropFilter: "blur(20px) saturate(180%)"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.xl}"
    height: 72px
    bottomOffset: 20px
    horizontalInset: "{spacing.4}"
  bottom-tab-btn-add:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    size: 52px
    rounded: "{rounded.lg}"
    boxShadow: "0 6px 14px -4px rgba(61, 107, 79, 0.5)"
    activeTransform: scale(0.95)
  modal:
    backgroundColor: "{colors.surface-card}"
    roundedDesktop: "{rounded.lg}"
    roundedMobileTop: "{rounded.xl}"
    scrim: "rgba(0, 0, 0, 0.32)"
    boxShadow: "0 24px 64px -16px rgba(26, 24, 21, 0.28)"
---

## Overview

Pluma reads like a personal finance product that refuses to be stressful. The page floor is a warm bege {colors.canvas} (#f6f2ea), and almost everything sits on card surfaces in {colors.surface-card} (#fffdf8) — barely distinguishable from each other, keeping the visual weight low. The single accent, moss-green {colors.primary} (#3d6b4f), carries every primary CTA, the sidebar active state, and positive financial signals like income and on-target balances.

Display numbers — balances, totals — are set in Fraunces, a humanist optical-axis serif that feels handwritten and considered rather than digital and urgent. Body text and all UI chrome use Inter. The two families coexist without collision because they occupy different semantic registers: Fraunces is for data that tells a story, Inter is for labels, buttons, and metadata that help you navigate.

Depth is almost absent. Cards float on the canvas through a barely-perceptible `{components.card.boxShadow}` rather than borders. Row separators inside cards are `{colors.divider}` hairlines that recall paper receipt perforations. No colored left-border accents, no gradient overlays, no busy backgrounds.

**Key Characteristics:**

- Single accent color: `{colors.primary}` does every brand job — CTAs, active nav, income indicators, focus rings.
- Fraunces for numbers only — never for body copy or UI labels.
- Hairline depth — cards separate from the canvas through shadow, not borders; rows separate through dividers, not padding gaps.
- Dessaturated category palette — 8 muted per-category colors that never look like a traffic light.
- Coral `{colors.negative}` is reserved for real alerts — never applied to ordinary expense rows.
- Motion is calm: `cubic-bezier(0.22, 1, 0.36, 1)`, 120–280ms, no bounce.

---

## Colors

### Brand & Accent

- **Moss** (`{colors.primary}` — #3d6b4f): The single brand color. Every primary CTA, the active sidebar item, income values, and focus rings. Used sparingly — most screens are 90% warm paper with one moss moment.
- **Moss hover** (`{colors.primary-hover}` — #2a4a37): Darker variant for hover states on primary buttons and active nav text.
- **Moss soft** (`{colors.primary-soft}` — #dde8df): Focus ring background (`0 0 0 3px`), success chip background, positive trend chips.
- **On-primary** (`{colors.on-primary}` — #fbf8f2): Text and icons placed directly on moss surfaces — warm near-white, not pure white.

### Surface

- **Canvas** (`{colors.canvas}` — #f6f2ea): The default app floor. Warm bege rather than white; lower glare, analogue feel.
- **Surface** (`{colors.surface}` — #fbf8f2): Sidebar and secondary panels — one tone lighter than canvas.
- **Surface card** (`{colors.surface-card}` — #fffdf8): Card plates floating above canvas. The distinction from canvas is subtle and intentional — depth through warmth, not contrast.
- **Surface elevated** (`{colors.surface-elevated}` — #ffffff): Modal dialogs and dropdowns at the highest layer.
- **Surface inset** (`{colors.surface-inset}` — #ece5d6): Chip backgrounds, segmented control tracks, any surface that reads as recessed.

### Text

- **Ink** (`{colors.ink}` — #1a1815): Primary text — all headings, values, names.
- **Ink secondary** (`{colors.ink-secondary}` — #4a463e): Secondary labels, inactive nav items, supporting text.
- **Ink tertiary** (`{colors.ink-tertiary}` — #807a6c): Meta text — dates, category labels, placeholders, column headers.

### Hairlines & Dividers

- **Hairline** (`{colors.hairline}` — rgba(26,24,21,0.08)): Card borders (when used), chip borders, bottom-tab-bar border. Present but visually calm.
- **Hairline strong** (`{colors.hairline-strong}` — rgba(26,24,21,0.16)): Input borders and more prominent separators.
- **Divider** (`{colors.divider}` — rgba(26,24,21,0.06)): Row separators within cards — lighter than hairline, recalls paper receipt perforations.

### Semantic Feedback

- **Positive** (`{colors.positive}` — #3d6b4f): Income rows, on-target balances, success states. Same value as primary — one color, two roles.
- **Positive soft** (`{colors.positive-soft}` — #dde8df): Background of trend chips showing growth.
- **Negative** (`{colors.negative}` — #c46a4e): Reserve for real alerts — over-budget warnings, error states. Never for ordinary expense rows.
- **Negative soft** (`{colors.negative-soft}` — #f5d9cf): Background of alert chips.
- **Warning** (`{colors.warning}` — #c89a2b): Budget approaching limit. Amber, not red — urges attention without alarming.
- **Warning soft** (`{colors.warning-soft}` — #f5e2b8): Warning chip and badge backgrounds.

### Category Palette

Eight muted, dessaturated per-category colors. They must never look like a traffic light or a children's app.

| Key | Hex | Category |
|---|---|---|
| `{colors.cat-grocery}` | #7a9b5e | Mercado |
| `{colors.cat-transport}` | #4f7a9b | Transporte |
| `{colors.cat-home}` | #9b6f4f | Casa |
| `{colors.cat-leisure}` | #b87a9b | Lazer |
| `{colors.cat-health}` | #5e9b9b | Saúde |
| `{colors.cat-food}` | #c47a4e | Alimentação |
| `{colors.cat-salary}` | #3d6b4f | Salário |
| `{colors.cat-other}` | #807a6c | Outros |

---

## Typography

### Families

| Role | Family | Notes |
|---|---|---|
| Display / Numbers | Fraunces (opsz 9–144) | Optical-axis serif. Weight 500 only. |
| Body / UI | Inter | Weights 400, 500, 600. |
| Mono | JetBrains Mono | Code blocks only, not used in product UI. |

### Hierarchy

| Style | Size | Weight | Leading | Tracking | Use |
|---|---|---|---|---|---|
| `{typography.display-1}` | 56px | 500 | 1.05 | -0.02em | Total balance, desktop |
| `{typography.display-2}` | 40px | 500 | 1.05 | -0.018em | Total balance, mobile |
| `{typography.display-3}` | 28px | 500 | 1.25 | -0.015em | Section highlight numbers |
| `{typography.heading-1}` | 24px | 600 | 1.25 | -0.01em | Page titles |
| `{typography.heading-2}` | 20px | 600 | 1.25 | -0.005em | Card headings, section titles |
| `{typography.body}` | 16px | 400 | 1.5 | 0 | Long-form body text |
| `{typography.body-sm}` | 14px | 400–600 | 1.5 | 0 | Table rows, labels, buttons |
| `{typography.meta}` | 12px | 500 | 1.5 | 0.01em | Timestamps, chip labels, column headers |
| `{typography.button}` | 14px | 600 | 1 | 0 | All interactive controls |
| `{typography.money-display}` | inherits display size | 500 | — | -0.01em | Monetary amounts in display contexts |
| `{typography.money-ui}` | inherits body-sm size | 600 | — | 0 | Monetary amounts in rows and tables |

### Principles

Fraunces is reserved exclusively for numbers that tell a financial story — balances, totals, sparkline-adjacent figures. It never appears in body copy, buttons, labels, or navigation. Inter handles all UI chrome. The reason: Fraunces at display size conveys calm authority over a number; at body size in a list it would read as decorative and tiring.

`{typography.money-display}` and `{typography.money-ui}` must always include `font-feature-settings: "tnum" 1` to ensure tabular number alignment in columns. In MUI, set via `fontFeatureSettings: '"tnum" 1'` on the `sx` prop.

### Casing Rules

- **Short expressive headlines:** lowercase (`"seu mês até agora"`, `"saldo total"`)
- **Buttons and form labels:** Sentence case (`"Adicionar movimentação"`)
- **App name and brand:** lowercase (`"pluma"`)
- **Proper nouns / category names:** natural capitalisation (`"Mercado"`, `"iFood"`, `"Uber"`)
- **Table column headers:** UPPERCASE, `{typography.meta}`, `letter-spacing: 0.04em`

### Note on Font Substitutes

Fraunces and Inter are served from Google Fonts. In production, self-host the WOFF2 files to avoid network dependency and GDPR issues with third-party font requests. The `colors_and_type.css` file includes the Google Fonts `@import` as a development convenience — replace with local `@font-face` declarations before shipping.

---

## Layout

### Spacing Scale

All spacing uses multiples of 4. Never use arbitrary values like 7px or 15px.

| Token | Value | Common use |
|---|---|---|
| `{spacing.1}` | 4px | Icon-to-label gap, tight chip padding |
| `{spacing.2}` | 8px | Inter-element gap in dense rows |
| `{spacing.3}` | 12px | Row vertical padding, nav item padding |
| `{spacing.4}` | 16px | Card padding mobile, grid gutter mobile |
| `{spacing.5}` | 24px | Card padding desktop, grid gutter desktop |
| `{spacing.6}` | 32px | Section gap |
| `{spacing.7}` | 48px | Large section breathing room |
| `{spacing.8}` | 64px | Page-level top padding |

### Grid & Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| `xs` | 0–599px | Single column, BottomTabBar, full-width cards |
| `sm` | 600–899px | 2-column cards, no sidebar, BottomTabBar |
| `md` | 900–1199px | Sidebar 220px + main content |
| `lg` | 1200px+ | Same as md, content capped at 1200px max-width |

Main content container: `max-width: 1200px`, `margin: 0 auto`.

### Page Shell

```
AppLayout
├── Sidebar (hidden xs/sm, visible md+) — width 220px, position sticky, height 100vh
├── main — flex 1, p: xs→16px sm→24px md→32px, pb: xs→108px (BottomTabBar clearance)
│   └── inner container maxWidth 1200px
│       ├── PageHeader — title (Fraunces display-3) + Add button (desktop only)
│       └── <Outlet /> — page-specific content
└── BottomTabBar (visible xs/sm, hidden md+) — fixed bottom 20px, inset 16px
```

### Whitespace Philosophy

Cards within a page grid use `gap: {spacing.4}` (16px). Row separators inside a card use `{colors.divider}` hairlines rather than vertical padding gaps — this gives transaction lists the feel of a paper statement rather than a digital list of boxes. Avoid using padding to create visual separation where a hairline achieves the same result more quietly.

---

## Elevation

| Level | Token | Value | Used on |
|---|---|---|---|
| 0 | — | none | Canvas floor, sidebar |
| 1 | `shadow-xs` | `0 1px 2px rgba(26,24,21,0.04)` | Almost invisible lift |
| 2 | `shadow-card` | `0 1px 2px rgba(26,24,21,0.04), 0 8px 24px -8px rgba(26,24,21,0.08)` | All cards |
| 3 | `shadow-elevated` | `0 4px 8px rgba(26,24,21,0.06), 0 16px 40px -8px rgba(26,24,21,0.14)` | Dropdowns, popovers |
| 4 | `shadow-modal` | `0 24px 64px -16px rgba(26,24,21,0.28)` | Modals and bottom sheets |

### Surface Hierarchy

```
canvas (level 0)
  └── surface / sidebar (level 0)
        └── surface-card / cards (level 2, shadow-card)
              └── surface-elevated / modals (level 4, shadow-modal)
```

### Rules

Never use coloured shadows or high-opacity drop shadows on feed cards — they shout. `shadow-card` is intentionally soft and long. Modal scrim is `rgba(0,0,0,0.32)` without `backdrop-filter` blur — the blur would distract from the modal content. Exception: the BottomTabBar uses `backdrop-filter: blur(20px) saturate(180%)` because it overlaps live content that scrolls beneath it.

---

## Components

**`button-primary`** — The primary CTA. Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.button}`, height 44px, padding 0 18px, rounded `{rounded.md}` (12px). Hover shifts background to `{colors.primary-hover}`. Active state applies `transform: scale(0.98)` — a subtle press that works on both click and touch without being distracting.

**`button-secondary`** — Secondary action. Transparent background, `{colors.ink}` text, `{typography.button}`, 1px border `{colors.hairline-strong}`, same sizing as primary. Hover background `rgba(26,24,21,0.04)`.

**`button-ghost`** — Tertiary or inline actions (e.g., "Ver tudo →" in cards). No border, no background. Hover background same as secondary. Use at `{typography.meta}` weight 500 when appearing inline next to a section heading.

**`card`** — The default content surface. Background `{colors.surface-card}`, rounded `{rounded.lg}` (18px), shadow `shadow-card`, padding `{spacing.4}` mobile / `{spacing.5}` desktop. Never add a border unless the card is on a surface that's the same colour as the card itself — in that case use 1px `{colors.hairline}`.

**`input`** — Text inputs and select dropdowns. Background `{colors.surface-card}`, border `1px solid {colors.hairline-strong}`, rounded `{rounded.md}` (12px), height 44px, type `{typography.body}`. Focus: border becomes `{colors.primary}`, shadow becomes `0 0 0 3px {colors.primary-soft}`.

**`chip`** — Inactive filter pill. Background `{colors.surface-inset}`, border `1px solid {colors.hairline}`, rounded `{rounded.pill}`, height 28px, type `{typography.meta}` weight 500. Transitions to `chip-active` on selection.

**`chip-active`** — Active filter pill. Background `{colors.primary}`, text `{colors.on-primary}`, same sizing as `chip`, no border. Transition: `all 120ms cubic-bezier(0.22,1,0.36,1)`.

**`transaction-row`** — A single expense or income line. Layout: flex row, align-center, `gap: {spacing.3}`, vertical padding `{spacing.3}`. Icon container: 36×36px, rounded `{rounded.icon}` (8px), background = category color, icon `currentColor` white at 16px stroke 2. Name in `{typography.body-sm}` weight 600. Meta line (category · account · date) in `{typography.meta}` color `{colors.ink-tertiary}`. Amount in `{typography.money-ui}` aligned right: income in `{colors.positive}`, expense in `{colors.ink}` (neutral — no red on ordinary expenses). Bottom `{colors.divider}` hairline, except on the last row.

**`sidebar-item`** — Desktop nav item. Background transparent, text `{colors.ink-secondary}`, type `{typography.body-sm}` weight 500, rounded `{rounded.nav-item}` (10px), padding `10px 12px`, icon 18px. Hover: background `rgba(26,24,21,0.04)`.

**`sidebar-item-active`** — Active desktop nav item. Background `rgba(61,107,79,0.12)`, text `{colors.primary-hover}`, font-weight 600. The translucent moss tint marks selection without a heavy filled chip.

**`bottom-tab-bar`** — Mobile navigation bar. Position fixed, bottom 20px, inset `{spacing.4}`, height 72px, rounded `{rounded.xl}` (28px). Background `rgba(255,253,248,0.88)` with `backdrop-filter: blur(20px) saturate(180%)`. Border `1px solid {colors.hairline}`. Tab labels in `{typography.meta}` weight 600, letter-spacing 0.02em. Active tab text in `{colors.primary-hover}`, inactive in `{colors.ink-tertiary}`.

**`bottom-tab-btn-add`** — The central "+" button in BottomTabBar. 52×52px, rounded `{rounded.lg}` (18px), background `{colors.primary}`, icon white 22px. Box-shadow `0 6px 14px -4px rgba(61,107,79,0.5)`. Active: `transform: scale(0.95)`.

**`modal`** — AddTransactionModal and future dialogs. On desktop: `Dialog` centred, max-width xs, rounded `{rounded.lg}`. On mobile: fixed bottom-0, full width, rounded `{rounded.xl}` top-only (28px 28px 0 0), slides up with translate-y 280ms. Scrim `rgba(0,0,0,0.32)`, no blur. Mobile handle: 40×4px pill, `rgba(26,24,21,0.16)`, centred above content.

---

## Responsive Behavior

| Breakpoint | Width | Key Changes |
|---|---|---|
| Mobile | < 600px | BottomTabBar; single-column grid; balance at `{typography.display-2}`; cards stack |
| Tablet | 600–899px | 2-column card grid; no sidebar; BottomTabBar persists |
| Desktop | 900–1199px | Sidebar 220px; 2–3 column grids; balance at `{typography.display-1}`; PageHeader shows Add button |
| Wide | 1200px+ | Same as desktop; content capped at 1200px; gutters absorb extra space |

### Touch Targets

- All interactive elements: minimum 44×44px (WCAG AA).
- `chip` and `chip-active` (h28) achieve touch target via larger padding on mobile or a transparent tap area.
- `bottom-tab-btn-add`: 52×52px — intentionally larger, it is the primary action.

### Collapsing Strategy

- **Navigation:** Sidebar ↔ BottomTabBar swap is pure CSS `display: none/flex` at the `md` breakpoint — no JS toggle, no state.
- **Modals:** Same component renders as centred `Dialog` on desktop and bottom sheet on mobile via `PaperProps` and `MuiDialog-container` alignment.
- **Sparkline:** Displays at 100×32px beside the trend chip on mobile; 180×56px to the right of the balance block on desktop.
- **`netLabel`:** Hidden on mobile (`display: { xs: 'none', sm: 'block' }`) to preserve balance readability at small size.
- **Income/Outgo card:** `flex-direction: row` on mobile (side-by-side), `column` on desktop (stacked to fill height alongside account cards).
- **CategoryTable:** Collapses 4-column grid to a compact icon+name+amount row on mobile; column headers are hidden.
- **Main padding-bottom on mobile:** `108px` to clear the floating BottomTabBar.

---

## Known Gaps

- **Animation timings:** Motion values (`cubic-bezier(0.22,1,0.36,1)`, 120–280ms) are documented as design intent but are not formal tokens in the YAML above. They are defined as CSS custom properties in `colors_and_type.css` (`--ease`, `--dur-fast`, `--dur-base`, `--dur-slow`).
- **Midnight Lime (dark theme):** The dark theme is fully specced in `colors_and_type.css` and the design system README, but is not yet wired to the MUI `ThemeProvider` in `src/theme/pluma.ts`. All components currently render in Warm Paper only.
- **Form validation states:** Error and success states for `input` (red border, error message below, success checkmark) are not specified in this file. Apply `{colors.negative}` / `{colors.negative-soft}` on error by analogy.
- **Empty states:** Zero-data views (no transactions, no categories set up) are not designed or documented.
- **Loading / skeleton states:** Skeleton placeholders for async data are not specified.
- **Notification / toast system:** In-app toasts and push notification templates are out of scope for this file.
- **Number animation:** The design system README mentions a 600ms count-up tween for balance changes. This is not implemented and not formally specced.
