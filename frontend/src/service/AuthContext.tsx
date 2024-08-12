import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContextType, JWTData } from "../helper/interfaces";

const baseUrl = "http://127.0.0.1:8000/api/";

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

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (typeof token !== "undefined") {
        const payload = jwtDecode(token!) as JWTData;
        const response = await axios.get(baseUrl + "users/" + payload.user_id);
        setUser(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(baseUrl + "auth/login", {
        username: email,
        password: password,
      });
      const { refresh, access } = response.data;
      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to login:", error);
      throw new Error("Invalid login credentials");
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    lastname: string,
    userType: string
  ) => {
    try {
      const response = await axios.post(baseUrl + "auth/register", {
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
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register, fetchUser }}
    >
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
