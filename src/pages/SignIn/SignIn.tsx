import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { useEffect } from 'react';
import {
  Button,
  em,
  Fieldset,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { AppRoutes, Colors, FormFieldNames } from '@/types/generalTypes';
import { isNotEmpty, useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';

export function SignIn() {
  const { signIn, user } = useAuthContext();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

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
    <Flex direction={'column'} align={'center'} gap={'lg'} mt={'20vh'}>
      <form style={{ margin: '0 25vw' }} onSubmit={form.onSubmit(handleSubmit)}>
        <Fieldset legend='Вход' w={isMobile ? '75vw' : '600px'}>
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
          <Button
            style={{ marginTop: '1rem' }}
            type='submit'
            variant='filled'
            radius={0}>
            Войти
          </Button>
        </Fieldset>
      </form>
      <Text size='20px'>Нет аккаунта в системе?</Text>
      <Button
        onClick={() => navigate('/' + AppRoutes.SignUp)}
        justify='center'
        variant='outline'
        color={Colors.Blue}
        size='xl'
        radius={'0'}>
        Зарегистрироваться
      </Button>
    </Flex>
  );
}
