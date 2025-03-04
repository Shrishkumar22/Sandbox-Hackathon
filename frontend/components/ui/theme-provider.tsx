"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { ReactNode } from "react";

// Extend ThemeProviderProps to explicitly include 'children'
interface CustomThemeProviderProps extends Omit<ThemeProviderProps, 'children'> {
  children: ReactNode;
}

export function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}