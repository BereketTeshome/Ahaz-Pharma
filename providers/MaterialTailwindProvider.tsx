"use client";
import { ThemeProvider } from "@material-tailwind/react";

export function MaterialTailwindProvider({ children }: { children: any }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
