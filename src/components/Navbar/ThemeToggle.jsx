import useTheme from "../../hooks/useTheme"

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-14 h-7 rounded-full border border-base-300
        transition-all duration-300 cursor-pointer
        flex items-center px-1
        ${isDark ? "bg-primary" : "bg-base-300"}
      `}
    >
      <div
        className={`
          w-5 h-5 rounded-full shadow-md
          transition-transform duration-300
          flex items-center justify-center text-[11px]
          ${isDark
            ? "translate-x-7 bg-white"
            : "translate-x-0 bg-white"
          }
        `}
      >
        {isDark ? "☀️" : "🌙"}
      </div>
    </button>
  )
}

export default ThemeToggle