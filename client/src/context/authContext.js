import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    
    JSON.parse(localStorage.getItem("user")) || null
    
  );
  const baseUrl = 'http://localhost:4000/api';



  const login = async (inputs) => {
    const res = await axios.post(`${baseUrl}/auth/login`, inputs,{
        withCredentials: true, 
      });
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post(`${baseUrl}/auth/logout`,
        {
            withCredentials: true, 
        }
    );
    setCurrentUser(null);
    
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
