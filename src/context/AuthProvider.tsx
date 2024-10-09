import { createContext, useContext, useState } from 'react';

type AuthContextT = {
  user: string | null;
  signIn: (user: string, callback: () => void) => void;
  signOut: (callback: () => void) => void;
};

const AuthContext = createContext<AuthContextT | null>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(() =>
    localStorage.getItem('username')
  );

  const signIn = (nickname: string, callback: () => void) => {
    localStorage.setItem('username', nickname);
    setUser(nickname);
    callback();
  };

  const signOut = (callback: () => void) => {
    localStorage.removeItem('username');
    setUser(null);
    callback();
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
