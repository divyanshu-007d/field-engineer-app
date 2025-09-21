import React from 'react';

// Authentication context for the Field Engineer App
export const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null,
  signIn: async () => ({ success: false }),
  signOut: async () => ({ success: false }),
  isLoading: false,
});

export default AuthContext;