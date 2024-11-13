import React, { createContext, useState } from 'react';
import axios from 'axios';

// Create Context
export const AuthContext = createContext();

// AuthProvider component that wraps around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to handle login
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });
      const { data } = response;

      // Set user data and store token in localStorage (or state)
      setUser(data.user);
      localStorage.setItem('token', data.token);

      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
