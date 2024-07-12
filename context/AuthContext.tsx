// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
  session: string | null;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSession = async () => {
      const token = await SecureStore.getItemAsync('session');
      setSession(token);
      setIsLoading(false);
    };
    loadSession();
  }, []);

  const signIn = async (token: string) => {
    await SecureStore.setItemAsync('session', token);
    setSession(token);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('session');
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
