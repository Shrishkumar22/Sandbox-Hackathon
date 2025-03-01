declare module 'next-themes/dist/types' {
    export interface ThemeProviderProps {
      attribute?: string
      defaultTheme?: string
      enableSystem?: boolean
      storageKey?: string
      forcedTheme?: string
      disableTransitionOnChange?: boolean
      themes?: string[]
      children?: React.ReactNode
    }
  }