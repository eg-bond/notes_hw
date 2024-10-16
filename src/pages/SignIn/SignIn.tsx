import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { useEffect } from 'react';
import { Button, Fieldset, PasswordInput, TextInput } from '@mantine/core';
import { AppRoutes } from '@/types/generalTypes';
import { isNotEmpty, useForm } from '@mantine/form';
import { FormFieldNames } from '../SignUp/SignUp';

export function SignIn() {
  const { signIn, user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // if user is already logged in - redirect to '/notes'
    if (user) {
      navigate(`/${AppRoutes.Notes}`);
    }
  }, [user]);

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: {
      [FormFieldNames.nickname]: '',
      [FormFieldNames.pass]: '',
    },
    validate: {
      [FormFieldNames.nickname]: isNotEmpty('Введите имя пользователя'),
      [FormFieldNames.pass]: isNotEmpty('Введите пароль'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const result = await signIn(
      values[FormFieldNames.nickname],
      values[FormFieldNames.pass]
    );

    if (result.success) {
      form.reset();
      navigate(`/${AppRoutes.Notes}`, { replace: true });
    } else {
      form.setFieldError(FormFieldNames.nickname, result.message);
      form.setFieldError(FormFieldNames.pass, result.message);
    }
  };

  return (
    <form style={{ margin: '0 25vw' }} onSubmit={form.onSubmit(handleSubmit)}>
      <Fieldset legend='Вход'>
        <TextInput
          {...form.getInputProps(FormFieldNames.nickname)}
          key={form.key(FormFieldNames.nickname)}
          label='Имя пользователя'
          placeholder='Ваше имя пользователя'
        />
        <PasswordInput
          {...form.getInputProps(FormFieldNames.pass)}
          key={form.key(FormFieldNames.pass)}
          label='Пароль'
          placeholder='Введите пароль'
        />
        <Button style={{ marginTop: '1rem' }} type='submit' variant='filled'>
          Войти
        </Button>
      </Fieldset>
    </form>
  );
}
