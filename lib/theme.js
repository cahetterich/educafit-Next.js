"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

const LIGHT = {
  primary: "#1F6FEB",
  primaryDark: "#0C3A74",
  primaryLight: "#69A7FF",
  accent: "#FF7A26",
  teal: "#14B8A6",
  purple: "#7C3AED",
  text: "#0F172A",
  textMuted: "#64748B",
  border: "#E2E8F0",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
};

const ThemeContext = createContext({ colors: LIGHT, mode: "light", setMode: () => {} });

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const colors = useMemo(() => {
    if (mode === "light") return LIGHT;
    return {
      ...LIGHT,
      bg: "#0B1220",
      card: "#0F172A",
      text: "#F8FAFC",
      textMuted: "#CBD5E1",
      border: "#1F2937",
    };
  }, [mode]);
  return (
    <ThemeContext.Provider value={{ colors, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);