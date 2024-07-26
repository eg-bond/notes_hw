import { AppRoutes } from '@/types/generalTypes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(AppRoutes.Main);
    }, 1000);
  }, []);

  return <div>NotFound</div>;
}
