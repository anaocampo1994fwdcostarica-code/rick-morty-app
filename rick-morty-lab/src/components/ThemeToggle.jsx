// src/components/ThemeToggle.jsx
export const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button type="button" className="theme-toggle" onClick={onToggle}>
      {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
    </button>
  );
};