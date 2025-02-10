"use client";
import { useState, useEffect, useContext,createContext } from 'react';

interface AuthContextType{
  isAuthenticated : boolean
  login: (token:string)=> void
  logout: ()=> void
}
export const AuthContext = createContext<AuthContextType | null>(null);
export  function AuthProvider ({children}: {children:React.ReactNode}){
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(()=>{
    const token = localStorage.getItem("access_token")
    setIsAuthenticated(!!token)
  }, [])
  const login = (token:string)=>{
    localStorage.setItem("access_token",token)
    setIsAuthenticated(true)
  }
  const logout = ()=>{
    localStorage.removeItem("access_token")
    setIsAuthenticated(false)
  }
  //return(<AuthContext>)
}
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
}
