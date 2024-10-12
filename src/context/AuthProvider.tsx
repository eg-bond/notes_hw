import { db, User } from '@/database/db';
import Dexie from 'dexie';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextT = {
  user: string | null;
  userId: number | null;
  authInit: boolean;
  signIn: (
    nickname: string,
    pass: string
  ) => Promise<
    | {
        success: true;
      }
    | {
        success: false;
        message: any;
      }
  >;
  signOut: (callback: () => void) => void;
  signUp: (
    nickname: string,
    pass: string
  ) => Promise<
    | {
        success: true;
      }
    | {
        success: false;
        message: any;
      }
  >;
  // signUp: (nickname: string, pass: string, callback: () => void) => void;
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

  const signIn: AuthContextT['signIn'] = async (nickname, pass) => {
    try {
      // todo: сделать шифрование пароля
      const user = await db.users.get({ nickname, pass });
      if (user) {
        await db.users.update(user.id, {
          signedIn: 1,
        });
        setUserId(user.id);
        setUser(user.nickname);
        return { success: true };
      } else {
        return {
          success: false,
          message: 'Неверное имя пользователя или пароль',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error?.message,
      };
    }

    // db.users.update(user.id, {
    //   signedIn: 1,
    // });

    // setUserId(user.id);
    // setUser(user.nickname);

    // callback();
  };

  const signUp = async (nickname: string, pass: string) => {
    try {
      await db.users.add({
        nickname,
        pass,
        signedIn: 0,
      });
      return { success: true };
    } catch (error) {
      if (error instanceof Dexie.ConstraintError) {
        return {
          success: false,
          message: 'Такое имя пользователя уже существует',
        };
      }
      return {
        success: false,
        message: error?.message,
      };
    }
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
