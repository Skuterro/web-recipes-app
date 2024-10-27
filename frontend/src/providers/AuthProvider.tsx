// AuthProvider.js
import { createContext, ReactNode, useState } from "react";
import { User } from "../models/user"; // Zakładam, że masz zdefiniowany model User
import axios from 'axios';

export interface AuthContextType {
  loggedUser?: User;
  setLoggedUser: (user?: User) => void;
  isLoading: boolean;
  handleLogin: (email: string, password: string) => Promise<void>; // Dodanie typu dla handleLogin
}

export const AuthContext = createContext<AuthContextType>({
  loggedUser: undefined,
  setLoggedUser: () => {},
  isLoading: true,
  handleLogin: async () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedUser, setLoggedUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("https://localhost:7061/api/Account/login", {
        email,
        password
      }, {
        withCredentials: true
      });
      console.log(response.data);
      // Zakładam, że odpowiedź zawiera użytkownika w response.data.user
      //setLoggedUser(response.data.user); // Ustawienie użytkownika po pomyślnym logowaniu
    //} catch (error) {
      //console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser, isLoading, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
