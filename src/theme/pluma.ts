import { createTheme } from '@mui/material/styles'

// ── Color tokens — ref: DESIGN.md § Colors ──────────────────────
export const plumaColors = {
  // Brand & accent
  primary:         '#3d6b4f',
  primaryHover:    '#2a4a37',
  primarySoft:     '#dde8df',
  onPrimary:       '#fbf8f2',
  // Surfaces
  canvas:          '#f6f2ea',
  surface:         '#fbf8f2',
  surfaceCard:     '#fffdf8',
  surfaceElevated: '#ffffff',
  surfaceInset:    '#ece5d6',
  // Text
  ink:             '#1a1815',
  inkSecondary:    '#4a463e',
  inkTertiary:     '#807a6c',
  // Hairlines & dividers
  hairline:        'rgba(26, 24, 21, 0.08)',
  hairlineStrong:  'rgba(26, 24, 21, 0.16)',
  divider:         'rgba(26, 24, 21, 0.06)',
  // Semantic feedback
  positive:        '#3d6b4f',
  positiveSoft:    '#dde8df',
  negative:        '#c46a4e',
  negativeSoft:    '#f5d9cf',
  warning:         '#c89a2b',
  warningSoft:     '#f5e2b8',
} as const

// ── Border-radius tokens — ref: DESIGN.md § rounded ─────────────
export const plumaRounded = {
  sm:      6,
  md:      12,
  lg:      18,
  xl:      28,
  pill:    999,
  navItem: 10,
  icon:    8,
} as const

// ── Spacing tokens — ref: DESIGN.md § spacing ───────────────────
export const plumaSpacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 32,
  7: 48,
  8: 64,
} as const

// ── Motion tokens — ref: DESIGN.md § Known Gaps (CSS vars) ──────
export const plumaMotion = {
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
  fast: '120ms',
  base: '200ms',
  slow: '320ms',
} as const

// ── Category palette — ref: DESIGN.md § Category Palette ────────
export const categoryColors = {
  grocery:   '#7a9b5e',
  transport: '#4f7a9b',
  home:      '#9b6f4f',
  leisure:   '#b87a9b',
  health:    '#5e9b9b',
  food:      '#c47a4e',
  salary:    '#3d6b4f',
  other:     '#807a6c',
} as const

// ── MUI Theme ────────────────────────────────────────────────────
export const plumaTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: plumaColors.canvas,
      paper:   plumaColors.surfaceCard,
    },
    text: {
      primary:   plumaColors.ink,
      secondary: plumaColors.inkSecondary,
      disabled:  plumaColors.inkTertiary,
    },
    primary: {
      main:         plumaColors.primary,
      dark:         plumaColors.primaryHover,
      light:        plumaColors.primarySoft,
      contrastText: plumaColors.onPrimary,
    },
    success: {
      main:  plumaColors.positive,
      light: plumaColors.positiveSoft,
    },
    error: {
      main:  plumaColors.negative,
      light: plumaColors.negativeSoft,
    },
    warning: {
      main:  plumaColors.warning,
      light: plumaColors.warningSoft,
    },
    divider: plumaColors.divider,
  },

  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    // heading-1
    h1: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },
    // heading-2
    h2: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '-0.005em',
    },
    // body
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    // body-sm
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: plumaColors.inkSecondary,
    },
    // meta
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
      color: plumaColors.inkTertiary,
    },
    // button — sentence case per DESIGN.md
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: 0,
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: plumaRounded.md,
  },

  // Elevation levels 0–5 matching DESIGN.md § Elevation
  shadows: [
    'none',                                                                                // 0 — none
    '0 1px 2px rgba(26,24,21,0.04)',                                                       // 1 — shadow-xs
    '0 1px 2px rgba(26,24,21,0.04), 0 8px 24px -8px rgba(26,24,21,0.08)',                 // 2 — shadow-card
    '0 4px 8px rgba(26,24,21,0.06), 0 16px 40px -8px rgba(26,24,21,0.14)',                // 3 — shadow-elevated
    '0 4px 8px rgba(26,24,21,0.06), 0 16px 40px -8px rgba(26,24,21,0.14)',                // 4 — shadow-elevated (dup)
    '0 24px 64px -16px rgba(26,24,21,0.28)',                                               // 5 — shadow-modal
    ...Array(19).fill('none'),
  ] as ReturnType<typeof createTheme>['shadows'],

  components: {
    // button-primary / button-secondary / button-ghost
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: plumaRounded.md,
          height: 44,
          padding: '0 18px',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          transition: `background ${plumaMotion.fast} ${plumaMotion.ease}, transform ${plumaMotion.fast} ${plumaMotion.ease}`,
          '&:active': { transform: 'scale(0.98)' },
          '&:hover': { boxShadow: 'none' },
        },
        outlined: {
          borderColor: plumaColors.hairlineStrong,
          color: plumaColors.ink,
          '&:hover': {
            backgroundColor: 'rgba(26, 24, 21, 0.04)',
            borderColor: plumaColors.hairlineStrong,
          },
        },
        text: {
          color: plumaColors.ink,
          '&:hover': { backgroundColor: 'rgba(26, 24, 21, 0.04)' },
        },
      },
    },

    // card
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: plumaColors.surfaceCard,
          borderRadius: plumaRounded.lg,
          boxShadow: '0 1px 2px rgba(26,24,21,0.04), 0 8px 24px -8px rgba(26,24,21,0.08)',
          border: 'none',
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: plumaSpacing[5],
          '&:last-child': { paddingBottom: plumaSpacing[5] },
        },
      },
    },

    // input
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: plumaRounded.md,
          backgroundColor: plumaColors.surfaceCard,
          transition: `box-shadow ${plumaMotion.fast} ${plumaMotion.ease}`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: plumaColors.hairlineStrong,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(26, 24, 21, 0.24)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: plumaColors.primary,
            borderWidth: 1,
          },
          '&.Mui-focused': {
            boxShadow: `0 0 0 3px ${plumaColors.primarySoft}`,
          },
        },
      },
    },

    // modal / bottom-sheet
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: plumaRounded.lg,
          boxShadow: '0 24px 64px -16px rgba(26,24,21,0.28)',
        },
        root: {
          '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.32)' },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: plumaColors.divider },
      },
    },

    // chip (inactive) + chip-active via colorPrimary
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: plumaRounded.pill,
          height: 28,
          fontSize: '0.75rem',
          fontWeight: 500,
          backgroundColor: plumaColors.surfaceInset,
          border: `1px solid ${plumaColors.hairline}`,
        },
        colorPrimary: {
          backgroundColor: plumaColors.primary,
          color: plumaColors.onPrimary,
          border: 'none',
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: plumaRounded.pill,
          backgroundColor: plumaColors.surfaceInset,
          height: 6,
        },
        bar: { borderRadius: plumaRounded.pill },
      },
    },
  },
})
