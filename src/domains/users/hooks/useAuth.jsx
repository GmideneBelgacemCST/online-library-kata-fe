import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/usersService";
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("loggedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false); 
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    sessionStorage.setItem("loggedUser", JSON.stringify(response));
    setUser(response);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("loggedUser");
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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
