import { useDarkMode } from '../../hooks/useDarkMode';

export default function ThemeSwitch() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="rounded-full p-2 text-sm font-medium transition-colors duration-300 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
