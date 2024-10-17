import { ReactNode, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/generalTypes';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate(AppRoutes.Main);
    }
  }, []);

  if (user === null) {
    return null;
  }

  return children;
};
