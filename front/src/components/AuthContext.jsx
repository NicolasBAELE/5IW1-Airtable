import React, { createContext, useState, useContext, useEffect } from 'react';
import { postJson } from '../services/fetch.services';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [token, setToken] = useState("");


  const login = (userData) => {
    postJson('login', userData)
      .then((res) => {
        alert('Vous êtes connecté')
        setIsAuthenticated(true)
        setToken(res.token)
      })
      .catch(err => alert(err))

  };

  const logout = () => {
    // Logique de déconnexion
    setIsAuthenticated(false)
  };

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
