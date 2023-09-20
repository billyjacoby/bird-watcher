export type HSLColor = `${number} ${number}% ${number}%`;

interface ThemeColors {
  background: HSLColor;
  foreground: HSLColor;
  primary: HSLColor;
  primaryForeground: HSLColor;
  secondary: HSLColor;
  secondaryForeground: HSLColor;
  muted: HSLColor;
  mutedForeground: HSLColor;
  accent: HSLColor;
  accentForeground: HSLColor;
  destructive: HSLColor;
  destructiveForeground: HSLColor;
  borderColor: HSLColor;
}

export type HSLFunction = (s: string) => string;
declare const hslFunction: HSLFunction;

export interface Colors {
  light: ThemeColors;
  dark: ThemeColors;
}
declare const colors: Colors;
