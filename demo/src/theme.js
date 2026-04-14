// Bootstrap v5.3 requires a data-bs-theme attribute to support dark mode.
const setTheme = () => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const theme = mediaQuery.matches ? "dark" : "light";
  document.documentElement.setAttribute("data-bs-theme", theme);
};
setTheme();
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setTheme);
