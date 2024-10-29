// AuthProvider.js
import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../models/user"; // Zakładam, że masz zdefiniowany model User
import axios from 'axios';
import Cookies from "js-cookie";

type AuthProviderProps = {
  children: ReactNode;
};

export interface AuthContextType {
  loggedUser?: User;
  setLoggedUser: (user?: User) => void;
  //isLoading: boolean;
  //handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  loggedUser: undefined,
  setLoggedUser: () => {},
  //isLoading: true,
  //handleLogin: async () => {},
  handleLogout: () => {},
});



export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedUser, setLoggedUser] = useState<User | undefined>(undefined);
  //const [isLoading, setIsLoading] = useState<boolean>(false);


/*
  const handleLogin = async (email: string, password: string) => {
    //setIsLoading(true);

      const response = await axios.post("https://localhost:7061/api/Account/Login", {
        email,
        password
      }, {
        withCredentials: true
      });
      const user = {
        id: response.data.userId,
        email: response.data.email,
        username: response.data.name,
        role: "user",
      };
      setLoggedUser(user);
  };*/

  const handleLogout = () => {
    setLoggedUser(undefined);
    Cookies.remove("jwt");
  }

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
