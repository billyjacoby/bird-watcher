/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const theme = require('./themeColors');

const {hslFunction, colors} = theme;

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        foreground: {
          DEFAULT: hslFunction(colors.light.foreground),
          dark: hslFunction(colors.dark.foreground),
        },
        background: {
          DEFAULT: hslFunction(colors.light.background),
          dark: hslFunction(colors.dark.background),
        },
        primary: {
          DEFAULT: hslFunction(colors.light.primary),
          dark: hslFunction(colors.dark.primary),
        },
        primaryForeground: {
          DEFAULT: hslFunction(colors.light.primaryForeground),
          dark: hslFunction(colors.dark.primaryForeground),
        },
        secondary: {
          DEFAULT: hslFunction(colors.light.secondary),
          dark: hslFunction(colors.dark.secondary),
        },
        secondaryForeground: {
          DEFAULT: hslFunction(colors.light.secondaryForeground),
          dark: hslFunction(colors.dark.secondaryForeground),
        },
        muted: {
          DEFAULT: hslFunction(colors.light.muted),
          dark: hslFunction(colors.dark.muted),
        },
        mutedForeground: {
          DEFAULT: hslFunction(colors.light.mutedForeground),
          dark: hslFunction(colors.dark.mutedForeground),
        },
        accent: {
          DEFAULT: hslFunction(colors.light.accent),
          dark: hslFunction(colors.dark.accent),
        },
        accentForeground: {
          DEFAULT: hslFunction(colors.light.accentForeground),
          dark: hslFunction(colors.dark.accentForeground),
        },
        destructive: {
          DEFAULT: hslFunction(colors.light.destructive),
          dark: hslFunction(colors.dark.destructive),
        },
        destructiveForeground: {
          DEFAULT: hslFunction(colors.light.destructiveForeground),
          dark: hslFunction(colors.dark.destructiveForeground),
        },
        borderColor: {
          DEFAULT: hslFunction(colors.light.borderColor),
          dark: hslFunction(colors.dark.borderColor),
        },
      },
    },
  },
  plugins: [],
};
