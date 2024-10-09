import { Location, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthProvider';
import { FormEvent } from 'react';
import { Button, TextInput } from '@mantine/core';

export function SignIn() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const location: Location<{ from: string } | null> = useLocation();

  let from = location.state?.from || '/';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;

    auth?.signIn(username, () => navigate(from, { replace: true }));
  };

  return (
    <form style={{ margin: '0 25vw' }} onSubmit={handleSubmit}>
      <TextInput
        style={{ marginTop: '1rem' }}
        type='text'
        name='username'
        label='Логин'
        placeholder='Введите логин'
        size='md'
        radius='sm'
      />
      <TextInput
        style={{ marginTop: '1rem' }}
        type='text'
        name='password'
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
