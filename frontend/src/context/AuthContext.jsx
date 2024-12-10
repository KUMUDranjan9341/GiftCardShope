import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const navigate=useNavigate()

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home page after logout.
  };

  const SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://vsee.netlify.app'
  : 'https://giftcardshope.onrender.com';
  
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,SERVER_URL }}>
      {children}
    </AuthContext.Provider>
  );
}
