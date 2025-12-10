import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface PhotographerData {
  brandName: string;
  email: string;
  description: string;
  bank: string;
  documentId: string;
  phone: string;
  accountHolder: string;
  logo?: string;
  watermark?: string;
}

export type { PhotographerData };

interface AuthContextType {
  user: User | null;
  photographer: PhotographerData | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setPhotographer: (data: PhotographerData | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [photographer, setPhotographer] = useState<PhotographerData | null>(null);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Load photographer data if user exists
      const storedPhotographer = localStorage.getItem(`photographer_${parsedUser.id}`);
      if (storedPhotographer) {
        setPhotographer(JSON.parse(storedPhotographer));
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    // Load photographer data
    const storedPhotographer = localStorage.getItem(`photographer_${userData.id}`);
    if (storedPhotographer) {
      setPhotographer(JSON.parse(storedPhotographer));
    } else {
      setPhotographer(null);
    }
  };

  const logout = () => {
    setUser(null);
    setPhotographer(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    photographer,
    isAuthenticated: !!user,
    login,
    logout,
    setPhotographer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
