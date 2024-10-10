import { NavLink } from 'react-router-dom';
import { NavLink as MantineNavlink } from '@mantine/core';
import { AppRoutes } from '@/types/generalTypes';

export function WelcomePage() {
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
