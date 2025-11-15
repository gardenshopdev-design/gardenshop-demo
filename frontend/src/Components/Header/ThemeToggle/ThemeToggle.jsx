import React from "react";
import { useTheme } from "../../../theme/useTheme";
import s from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      className={`${s.switch} ${theme === "dark" ? s.on : ""}`}
      aria-label="Toggle dark mode"
      aria-pressed={theme === "dark"}
    >
      <span className={s.thumb} />
      <span className={s.icons} aria-hidden="true">
        <span className={s.sun}>☀️</span>
        <span className={s.moon}>🌙</span>
      </span>
    </button>
  );
};

export default ThemeToggle;
