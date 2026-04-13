import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (id: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('app-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (id: string, name: string) => {
    const newUser = { id, name };
    setUser(newUser);
    localStorage.setItem('app-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('app-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
