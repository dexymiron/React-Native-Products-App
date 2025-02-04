import { useContext } from "react";
import { AuthContext } from "../ContextAPI/AuthContext/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must used in AuthProvider");
  }
  return context;
};
