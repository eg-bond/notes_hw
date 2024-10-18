import { db } from '@/database/db';
import { hashPassword, verifyPassword } from '@/helpers/passHelpers';
import Dexie from 'dexie';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
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

  // looks if some user is already logged in
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const signedUser = await db.users.get({ signedIn: 1 });
        if (signedUser) {
          setUserId(signedUser.id);
          setUser(signedUser.nickname);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setAuthInit(true);
      }
    };

    initializeAuth();
  }, []);

  const signIn: IAuthContext['signIn'] = useCallback(async (nickname, pass) => {
    try {
      const userInDB = await db.users.get({ nickname });

      if (!userInDB) {
        return {
          success: false,
          message: 'Неверное имя пользователя или пароль',
        };
      }

      const isValidPassword = await verifyPassword(pass, userInDB.hashedPass);

      if (!isValidPassword) {
        return {
          success: false,
          message: 'Неверное имя пользователя или пароль',
        };
      }

      await db.users.update(userInDB.id, {
        signedIn: 1,
      });
      setUserId(userInDB.id);
      setUser(userInDB.nickname);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error?.message,
      };
    }
  }, []);

  const signUp: IAuthContext['signUp'] = useCallback(async (nickname, pass) => {
    const hashedPass = hashPassword(pass);

    try {
      await db.users.add({ nickname, hashedPass, signedIn: 0 });
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
  }, []);

  const signOut: IAuthContext['signOut'] = useCallback(async () => {
    try {
      if (userId) {
        await db.users.update(userId, { signedIn: 0 });
        setUserId(null);
        setUser(null);
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error?.message,
      };
    }
  }, [userId]);

  const value = { user, userId, authInit, signIn, signOut, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
