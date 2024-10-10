import { db, User } from '@/database/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextT = {
  user: string | null;
  userId: number | null;
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

  // const signedUser = useLiveQuery(() => db.users.get({ signedIn: true }));

  // useEffect(() => {
  //   if (signedUser) {
  //     setUserId(signedUser.id);
  //     setUser(signedUser.nickname);
  //   }
  // }, []);

  const signIn = (user: User, callback: () => void) => {
    db.users.update(user.id, {
      signedIn: true,
    });

    setUserId(user.id);
    setUser(user.nickname);

    callback();
  };

  const signUp = (nickname: string, pass: string, callback: () => void) => {
    db.users.add({ nickname, pass, signedIn: false });
    callback();
  };

  const signOut = (callback: () => void) => {
    db.users.update(userId, {
      signedIn: false,
    });

    setUserId(null);
    setUser(null);
    callback();
  };

  const value = { user, userId, signIn, signOut, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
