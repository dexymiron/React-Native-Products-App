import { useContext } from "react";
import { ThemeContext } from "../ContextAPI/ThemeContext/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must used in ThemeProvider");
  }
  return context;
};
