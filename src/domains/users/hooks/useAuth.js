import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/usersService"; // Import the login service

// Create AuthContext
const AuthContext = createContext();

// AuthProvider to wrap the application
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on app load
  useEffect(() => {
    const storedUser = sessionStorage.getItem("loggedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false); // Loading state is set to false after the check
  }, []);

  // Login function with service call
  const login = async (credentials) => {
    const response = await loginUser(credentials); // Call the backend API
    sessionStorage.setItem("loggedUser", JSON.stringify(response)); // Store user in session
    setUser(response);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    sessionStorage.removeItem("loggedUser"); // Clear session
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// useAuth custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
