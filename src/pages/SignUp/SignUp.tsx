import { useAuthContext } from '@/context/AuthContext';
import { AppRoutes, Colors, FormFieldNames } from '@/types/generalTypes';
import {
  Button,
  Fieldset,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { hasLength, matchesField, useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const { signUp, signIn } = useAuthContext();
  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: {
      [FormFieldNames.nickname]: '',
      [FormFieldNames.pass]: '',
      [FormFieldNames.confirm_pass]: '',
    },
    validate: {
      [FormFieldNames.nickname]: hasLength(
        { min: 4 },
        'Имя пользователя должно содержать минимум 4 символа'
      ),
      [FormFieldNames.pass]: hasLength(
        { min: 6 },
        'Пароль должен содержать минимум 6 символов'
      ),
      [FormFieldNames.confirm_pass]: matchesField(
        FormFieldNames.pass,
        'Пароли не совпадают'
      ),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const result = await signUp(
      values[FormFieldNames.nickname],
      values[FormFieldNames.pass]
    );
    if (result.success) {
      form.reset();
      await signIn(
        values[FormFieldNames.nickname],
        values[FormFieldNames.pass]
      );
      navigate(`/${AppRoutes.Notes}`, { replace: true });
    } else {
      form.setFieldError(FormFieldNames.nickname, result.message);
    }
  };

  return (
    <>
      <Flex direction={'column'} align={'center'} gap={'lg'} mt={'20vh'}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Fieldset legend='Регистрация' w={'650px'}>
            <TextInput
              {...form.getInputProps(FormFieldNames.nickname)}
              key={form.key(FormFieldNames.nickname)}
              label='Ваш логин'
              placeholder='Введите логин'
            />
            <PasswordInput
              {...form.getInputProps(FormFieldNames.pass)}
              key={form.key(FormFieldNames.pass)}
              label='Ваш пароль'
              placeholder='Введите пароль'
            />
            <PasswordInput
              {...form.getInputProps(FormFieldNames.confirm_pass)}
              key={form.key(FormFieldNames.confirm_pass)}
              label='Повторите пароль'
              placeholder='Повторите пароль'
            />
            <Button
              style={{ marginTop: '1rem' }}
              type='submit'
              variant='filled'
              color={Colors.Blue}
              radius={0}>
              Зарегистрироваться
            </Button>
          </Fieldset>
        </form>

        <Text size='20px'>Уже есть аккаунт в системе?</Text>
        <Button
          onClick={() => navigate('/' + AppRoutes.SignIn)}
          justify='center'
          variant='filled'
          color={Colors.Green}
          size='xl'
          w={'200px'}
          radius={'0'}>
          Войти
        </Button>
      </Flex>
    </>
  );
}
