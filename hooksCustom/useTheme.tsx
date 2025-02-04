import { useContext } from "react";
import { ThemeContext } from "../ContextAPI/ThemeContext/ThemeContext";

export const useTheme = () => useContext(ThemeContext);
