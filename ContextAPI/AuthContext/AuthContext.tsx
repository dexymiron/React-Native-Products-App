import { createContext } from "react";

interface AuthContextType {
  isAuth: boolean | null;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
