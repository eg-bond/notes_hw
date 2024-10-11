import { db, User } from '@/database/db';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextT = {
  user: string | null;
  userId: number | null;
  authInit: boolean;
  signIn: (user: User, callback: () => void) => void;
  signOut: (callback: () => void) => void;
  signUp: (nickname: string, pass: string, callback: () => void) => void;
};

const AuthContext = createContext<AuthContextT | null>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [authInit, setAuthInit] = useState<boolean>(false);

  useEffect(() => {
    db.users
      .get({ signedIn: 1 })
      .then(signedUser => {
        if (signedUser) {
          setUserId(signedUser.id);
          setUser(signedUser.nickname);
        }
      })
      .then(() => setAuthInit(true));
  }, []);

  const signIn = (user: User, callback: () => void) => {
    db.users.update(user.id, {
      signedIn: 1,
    });

    setUserId(user.id);
    setUser(user.nickname);

    callback();
  };

  const signUp = (nickname: string, pass: string, callback: () => void) => {
    db.users.add({ nickname, pass, signedIn: 0 });
    callback();
  };

  const signOut = (callback: () => void) => {
    db.users.update(userId as number, {
      signedIn: 0,
    });

    setUserId(null);
    setUser(null);
    callback();
  };

  const value = { user, userId, authInit, signIn, signOut, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
