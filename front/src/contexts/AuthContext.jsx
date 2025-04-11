import React, { createContext, useState, useContext, useEffect } from 'react';
import { postJson } from '../services/fetch.services';
import { useGlobal } from './GlobalContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const { setGlobalLoading } = useGlobal()
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const login = (userData) => {
    setGlobalLoading(true)
    postJson('login', userData)
      .then((res) => {
        const token = res.token
        const decoded = jwtDecode(token)
        setIsAuthenticated(true)
        setToken(decoded)
        navigate('/projects')
      })
      .catch(err => alert(err))
      .finally(() => setGlobalLoading(false))
  };

  const logout = () => {
    setIsAuthenticated(false)
    setIsAdmin(false)
    setToken('')
    setUserId('')
  };

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);

  useEffect(() => {
    if (token) {
      setIsAdmin(token.isAdmin)
      setUserId(token.userId)
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
