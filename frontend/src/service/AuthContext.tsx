import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { AuthContextType, JWTData } from "../helper/interfaces";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
      fetchUser();
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (typeof token !== "undefined") {
        const payload = jwtDecode(token!) as JWTData;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}users/${payload.user_id}`);
        setUser(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      logout();
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`, {
        username: email,
        password: password,
      });
      const { refresh, access } = response.data;
      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      setIsAuthenticated(true);
      fetchUser();
    } catch (error) {
      console.error("Failed to login:", error);
      throw new Error("Invalid login credentials");
    }
  }, [fetchUser]);

  const register = useCallback(async (
    email: string,
    password: string,
    name: string,
    lastname: string,
    userType: string
  ) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/register`, {
        username: email,
        password: password,
        name: name,
        lastname: lastname,
        status: "active",
        user_type: userType,
      });
      const user = response.data;
      localStorage.setItem("user", user);
      setUser(user);
    } catch (error) {
      console.error("Failed to register:", error);
      throw new Error("Failed to register");
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    login,
    logout,
    register,
    fetchUser,
  }), [isAuthenticated, user, login, logout, register, fetchUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
