import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getTokenFromStorage } from "../../asyncstorage/authStorage";

interface AuthProviderType {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const login = () => console.log("login success");
  const logout = () => console.log("logout success");

  //initialization check Auth
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedAuth = await getTokenFromStorage();
        setIsAuth(!!savedAuth);
      } catch (error) {
        console.error("Error fetching token:", error);
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
