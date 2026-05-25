import type { CSSProperties } from 'react'

declare module '@mui/material/styles' {
  interface TypeBackground {
    surface: string
    surfaceAvatar: string
    surfaceInset: string
  }
  interface Shape {
    rounded: {
      sm: number
      md: number
      lg: number
      xl: number
      pill: number
      navItem: number
      icon: number
      circle: string
    }
  }
  interface ShapeOptions {
    rounded?: {
      sm: number
      md: number
      lg: number
      xl: number
      pill: number
      navItem: number
      icon: number
      circle: string
    }
  }
  interface TypographyVariants {
    displayMoney: CSSProperties
    displaySm: CSSProperties
    displayCard: CSSProperties
    displayXs: CSSProperties
    pageTitle: CSSProperties
    brandName: CSSProperties
    brandIcon: CSSProperties
    amountMd: CSSProperties
    labelSm: CSSProperties
    amountSm: CSSProperties
    rowTitle: CSSProperties
    rowAmount: CSSProperties
    navLabel: CSSProperties
    tableHeader: CSSProperties
  }
  interface TypographyVariantsOptions {
    displayMoney?: CSSProperties
    displaySm?: CSSProperties
    displayCard?: CSSProperties
    displayXs?: CSSProperties
    pageTitle?: CSSProperties
    brandName?: CSSProperties
    brandIcon?: CSSProperties
    amountMd?: CSSProperties
    labelSm?: CSSProperties
    amountSm?: CSSProperties
    rowTitle?: CSSProperties
    rowAmount?: CSSProperties
    navLabel?: CSSProperties
    tableHeader?: CSSProperties
  }
  interface Palette {
    categoryColors: Record<string, string>
  }
  interface PaletteOptions {
    categoryColors?: Record<string, string>
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    displayMoney: true
    displaySm: true
    displayCard: true
    displayXs: true
    pageTitle: true
    brandName: true
    brandIcon: true
    amountMd: true
    labelSm: true
    amountSm: true
    rowTitle: true
    rowAmount: true
    navLabel: true
    tableHeader: true
  }
}
