import { ReactNode, useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import { ThemeContext } from "./ThemeContext";
import { Colors } from "../../constants/tokens";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useColorScheme();

  const [theme, setTheme] = useState(systemTheme || "dark");
  const [isEnabled, setIsEnabled] = useState(false); // for toggle

  useEffect(() => {
    setTheme(systemTheme || "dark");
  }, [systemTheme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setIsEnabled(!isEnabled);
  };

  return (
    <ThemeContext.Provider value={{ isEnabled, theme, toggleTheme }}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme === "dark" ? Colors.halfWhite : Colors.brown,
        }}
      >
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
