module.exports = {
  purge: [],
  // mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "768px",
      md: "1080px",
      lg: "1441px",
    },
    spacing: {
      0: 0,
      xxs: "var(--space-xxs)",
      xs: "var(--space-xs)",
      sm: "var(--space-sm)",
      md: "var(--space-md)",
      lg: "var(--space-lg)",
      xl: "var(--space-xl)",
    },
    colors: {
      black: "#000",
      white: "#fff",
      // gray: "#c4c4c4",
      gray: "var(--color-gray)",
      yellow: "var(--color-yellow)",
    },
    fontSize: {
      sm: ["var(--text-sm)", "1.1"],
      md: ["var(--text-md)", "1.257142857"],
      lg: ["var(--text-lg)", "1.25"],
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
