import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type User = {
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? { token: storedToken } : null;
  });

  const login = (token: string) => {
    const newUser = { token };
    setUser(newUser);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Check for token expiration
  useEffect(() => {
    if (user?.token) {
      // This is a simplified approach. You might want to decode the JWT and check its expiry.
      // For a production app, you should implement proper token refresh mechanisms.
      const tokenParts = user.token.split('.');
      if (tokenParts.length !== 3) {
        logout();
        return;
      }

      try {
        const payload = JSON.parse(atob(tokenParts[1]));
        const exp = payload.exp * 1000; // Convert to milliseconds
        
        if (Date.now() >= exp) {
          logout();
        }
      } catch (error) {
        console.error('Error checking token expiration', error);
        logout();
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};