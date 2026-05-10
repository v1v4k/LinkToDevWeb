import useTheme from "../hooks/useTheme";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-16 h-8 rounded-full border border-base-300
        transition-all duration-300 cursor-pointer
        flex items-center px-1
        ${isDark ? "bg-primary" : "bg-base-content/20"}
      `}
    >
      <div
        className={`
          w-6 h-6 rounded-full shadow-md
          transition-transform duration-300
          flex items-center justify-center text-base
          ${isDark
            ? "translate-x-8 bg-white"
            : "translate-x-0 bg-white"
          }
        `}
      >
        {isDark ? "☀️" : "🌙"}
      </div>
    </button>
  );
};

export default ThemeToggle;