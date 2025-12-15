// src/hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from "react";
import { login as apiLogin, signup as apiSignup } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { userId, username }
  const [token, setToken] = useState(null);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Load auth from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  function saveAuth(data) {
    const { token, userId, username } = data;
    const userObj = { userId, username };

    setToken(token);
    setUser(userObj);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userObj));
  }

  async function login({ username, password }) {
    setAuthError("");
    setAuthLoading(true);
    try {
      const data = await apiLogin({ username, password });
      saveAuth(data);
      return data;
    } catch (e) {
      setAuthError(e.message);
      throw e;
    } finally {
      setAuthLoading(false);
    }
  }

  async function signup({ username, password }) {
    setAuthError("");
    setAuthLoading(true);
    try {
      const data = await apiSignup({ username, password });
      saveAuth(data);
      return data;
    } catch (e) {
      setAuthError(e.message);
      throw e;
    } finally {
      setAuthLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    setAuthError("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  const value = {
    user,
    token,
    authError,
    authLoading,
    login,
    signup,
    logout,
    isLoggedIn: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
