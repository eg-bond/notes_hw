import { AuthStatus } from '@/components/AuthStatus';
import { useAuthContext } from '@/context/AuthContext';
import {
  Button,
  Dialog,
  Fieldset,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { hasLength, matchesField, useForm } from '@mantine/form';
import { useState } from 'react';

export enum FormFieldNames {
  nickname = 'nickname',
  pass = 'pass',
  confirm_pass = 'confirm_pass',
}

export function SignUp() {
  const { signUp } = useAuthContext();
  // const navigate = useNavigate();
  const [signUpSuccess, setSignUpSuccess] = useState(false);

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
      setSignUpSuccess(true);
    } else {
      form.setFieldError(FormFieldNames.nickname, result.message);
    }
  };

  return (
    <>
      <AuthStatus />
      <form style={{ margin: '0 25vw' }} onSubmit={form.onSubmit(handleSubmit)}>
        <Fieldset legend='Signing up'>
          <TextInput
            {...form.getInputProps(FormFieldNames.nickname)}
            key={form.key(FormFieldNames.nickname)}
            label='Nickname'
            placeholder='Your nickname'
          />
          <PasswordInput
            {...form.getInputProps(FormFieldNames.pass)}
            key={form.key(FormFieldNames.pass)}
            label='Password'
            placeholder='Password'
          />
          <PasswordInput
            {...form.getInputProps(FormFieldNames.confirm_pass)}
            key={form.key(FormFieldNames.confirm_pass)}
            label='Confirm password'
            placeholder='Confirm password'
          />
          <Button style={{ marginTop: '1rem' }} type='submit' variant='filled'>
            Sign Up
          </Button>
        </Fieldset>
      </form>

      <Dialog
        opened={signUpSuccess}
        position={{ top: 20, right: 20 }}
        withCloseButton
        onClose={() => setSignUpSuccess(false)}
        size='lg'
        radius='md'>
        <Text size='sm' mb='xs' fw={500}>
          Successfull registarion!
        </Text>
      </Dialog>
    </>
  );
}
