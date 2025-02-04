import { createContext, useContext } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  isEnabled: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  isEnabled: false,
});
