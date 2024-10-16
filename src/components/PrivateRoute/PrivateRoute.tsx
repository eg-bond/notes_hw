import { ReactNode } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '@/types/generalTypes';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (user === null) {
    return (
      <Navigate
        to={`/${AppRoutes.Main}`}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
};
