import { NavLink, useNavigate } from 'react-router-dom';
import { NavLink as MantineNavlink } from '@mantine/core';
import { AppRoutes } from '@/types/generalTypes';
import { useAuthContext } from '@/context/AuthProvider';
import { useEffect } from 'react';
import { AddUser } from '@/database/AddUser';

export function WelcomePage() {
  const auth = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate(`/${AppRoutes.Notes}`);
    }
  }, [auth?.user]);

  if (auth?.user) {
    return null;
  }

  return (
    <div>
      <div>
        <h1>Заметки</h1>
        <p>Ваша цифровая записная книжка</p>
      </div>
      <MantineNavlink
        variant='filled'
        fw={'bold'}
        description='Sign In'
        to={`/${AppRoutes.SignIn}`}
        component={NavLink}
      />
      <MantineNavlink
        variant='filled'
        fw={'bold'}
        description='Sign Up'
        to={`/${AppRoutes.SignUp}`}
        component={NavLink}
      />
    </div>
  );
}
