import { Location, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthProvider';
import { FormEvent } from 'react';
import { Button, TextInput } from '@mantine/core';
import { db } from '@/database/db';

export function SignIn() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const location: Location<{ from: string } | null> = useLocation();

  let from = location.state?.from || '/';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nickname = formData.get('nickname') as string;
    const pass = formData.get('pass') as string;

    const user = await db.users.get({ nickname });

    if (!user) {
      console.log('There is no such user');
      return;
    }

    if (user.pass === pass) {
      auth?.signIn(user, () => navigate(from, { replace: true }));
    } else {
      console.log('Password is incorrect');
    }
  };

  return (
    <form style={{ margin: '0 25vw' }} onSubmit={handleSubmit}>
      <TextInput
        style={{ marginTop: '1rem' }}
        type='text'
        name='nickname'
        label='Логин'
        placeholder='Введите логин'
        size='md'
        radius='sm'
      />
      <TextInput
        style={{ marginTop: '1rem' }}
        type='text'
        name='pass'
        label='Пароль'
        placeholder='Вообще можно и не вводить))'
        size='md'
        radius='sm'
      />
      <Button style={{ marginTop: '1rem' }} type='submit' variant='filled'>
        Войти
      </Button>
    </form>
  );
}
