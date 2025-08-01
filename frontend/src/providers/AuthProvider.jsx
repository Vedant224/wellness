import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authService } from '../services/auth.service';
import { AuthContext } from '../contexts/AuthContext';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const fetchUser = async () => {
        try {
          setCurrentUser({ isLoggedIn: true });
        } catch (error) {
          console.error('Failed to fetch user data', error);
          handleLogout();
        } finally {
          setLoading(false);
        }
      };
      
      fetchUser();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setLoading(false);
    }
  }, [token]);

  const handleLogin = async (email, password) => {
    const response = await authService.login(email, password);
    
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setCurrentUser(response.data.data.user);
      return response.data;
    }
    
    return null;
  };
  

  const handleRegister = async (email, password) => {
    const response = await authService.register(email, password);
    
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setCurrentUser(response.data.data.user);
      return response.data;
    }
    
    return null;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const value = {
    currentUser,
    token,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}