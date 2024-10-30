// AuthProvider.js
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../models/user";
import axios from 'axios';
import Cookies from "js-cookie";

type AuthProviderProps = {
  children: ReactNode;
};

export interface AuthContextType {
  loggedUser?: User;
  setLoggedUser: (user?: User) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  loggedUser: undefined,
  setLoggedUser: () => {},
  handleLogout: () => {},
});



export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedUser, setLoggedUser] = useState<User | undefined>(undefined);

  const handleLogout = () => {
    setLoggedUser(undefined);
    Cookies.remove("jwt");
  }

  const loadUser = async () => {

    const token = Cookies.get("jwt");

    const response = await axios.get("https://localhost:7061/api/Account/Token",{
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    });
    const user = {
      id: response.data.userId,
      email: response.data.email,
      username: response.data.name,
      role: "user",
    };
    setLoggedUser(user);
  };

  useEffect(() => {

    if(loggedUser === undefined){
      loadUser();
    }
  },[]);

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
