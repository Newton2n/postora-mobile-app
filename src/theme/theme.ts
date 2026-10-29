import { Platform } from "react-native";

export const colors = {
  light: {
    background: "#f4f7fb",
    surface: "#ffffff",
    glass: "rgba(255,255,255,0.78)",
    text: "#0f172a",
    secondaryText: "#64748b",
    border: "rgba(148,163,184,0.24)",
    primary: "#2563eb",
    primarySoft: "#dbeafe",
    danger: "#dc2626",
  },
  dark: {
    background: "#0b1120",
    surface: "#111827",
    glass: "rgba(17,24,39,0.78)",
    text: "#f8fafc",
    secondaryText: "#94a3b8",
    border: "rgba(148,163,184,0.22)",
    primary: "#60a5fa",
    primarySoft: "#172554",
    danger: "#f87171",
  },
} as const;

export type AppTheme = (typeof colors)["light"];
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
export const radius = { sm: 10, md: 16, lg: 22, pill: 999 } as const;
export const typography = {
  title: { fontSize: 32, lineHeight: 38, fontWeight: "800" as const },
  heading: { fontSize: 24, lineHeight: 30, fontWeight: "800" as const },
  body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 13, lineHeight: 18 },
};

export const shadow = Platform.select({
  ios: { shadowColor: "#0f172a", shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } },
  android: { elevation: 3 },
  default: {},
});
