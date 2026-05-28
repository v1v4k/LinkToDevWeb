import { useEffect, useState } from "react";

const DARK = "linktodev-dark";
const LIGHT = "linktodev-light";
const KEY = "linktodev-theme";

const useTheme = () => {
  const getInitial = () =>
    document.documentElement.getAttribute("data-theme") === DARK;

  const [isDark, setIsDark] = useState(getInitial);

  useEffect(() => {
    const theme = isDark ? DARK : LIGHT;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme };
};

export default useTheme;
