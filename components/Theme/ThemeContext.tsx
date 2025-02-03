import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme, View } from "react-native";
import { Colors } from "../../constants/tokens";

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

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useColorScheme();

  const [theme, setTheme] = useState(systemTheme || "dark");
  const [isEnabled, setIsEnabled] = useState(false);

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

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
