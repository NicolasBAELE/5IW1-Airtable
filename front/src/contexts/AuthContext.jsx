import React, { createContext, useState, useContext, useEffect } from 'react';
import { postJson } from '../services/fetch.services';
import { useGlobal } from './GlobalContext';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const { setGlobalLoading } = useGlobal()
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [token, setToken] = useState("");


  const login = (userData) => {
    setGlobalLoading(true)
    postJson('login', userData)
      .then((res) => {
        setIsAuthenticated(true)
        setToken(res.token)
        navigate('/projects')
      })
      .catch(err => alert(err))
      .finally(() => setGlobalLoading(false))

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
