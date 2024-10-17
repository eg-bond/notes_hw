import { db } from '@/database/db';
import { hashPassword, verifyPassword } from '@/helpers/passHelpers';
import Dexie from 'dexie';
import { createContext, useContext, useEffect, useState } from 'react';
import type { IAuthContext, ProviderProps } from '@/types/contextTypes';

const AuthContext = createContext<IAuthContext | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return context;
}

export function AuthProvider({ children }: ProviderProps) {
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

  const signIn: IAuthContext['signIn'] = async (nickname, pass) => {
    try {
      // todo: сделать шифрование пароля
      const user = await db.users.get({ nickname });

      if (!user) {
        return {
          success: false,
          message: 'Неверное имя пользователя или пароль',
        };
      }

      const isValidPassword = await verifyPassword(pass, user.hashedPass);

      if (!isValidPassword) {
        return {
          success: false,
          message: 'Неверное имя пользователя или пароль',
        };
      }

      await db.users.update(user.id, {
        signedIn: 1,
      });
      setUserId(user.id);
      setUser(user.nickname);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error?.message,
      };
    }
  };

  const signUp: IAuthContext['signUp'] = async (nickname, pass) => {
    // const hashedPass = pass;
    const hashedPass = hashPassword(pass);

    try {
      await db.users.add({
        nickname,
        hashedPass,
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

  const signOut: IAuthContext['signOut'] = async callback => {
    try {
      db.users.update(userId as number, {
        signedIn: 0,
      });

      setUserId(null);
      setUser(null);
      callback();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error?.message,
      };
    }
  };

  const value = { user, userId, authInit, signIn, signOut, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
