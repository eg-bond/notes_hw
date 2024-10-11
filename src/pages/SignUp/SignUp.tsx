import { AuthStatus } from '@/components/AuthStatus';
import { useAuthContext } from '@/context/AuthProvider';
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
import { useNavigate } from 'react-router-dom';

enum FormFieldNames {
  nickname = 'nickname',
  pass = 'pass',
  confirm_pass = 'confirm_pass',
}

export function SignUp() {
  const auth = useAuthContext();
  // const navigate = useNavigate();
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      [FormFieldNames.nickname]: '',
      [FormFieldNames.pass]: '',
      [FormFieldNames.confirm_pass]: '',
    },
    validate: {
      [FormFieldNames.nickname]: hasLength(
        { min: 3 },
        'Must be at least 3 characters'
      ),
      [FormFieldNames.pass]: hasLength(
        { min: 6 },
        'Must be at least 6 characters'
      ),
      [FormFieldNames.confirm_pass]: matchesField(
        FormFieldNames.pass,
        'Passwords are not the same'
      ),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    auth?.signUp(
      values[FormFieldNames.nickname],
      values[FormFieldNames.pass],
      () => {
        form.reset();
        // navigate(`${AppRoutes.Main}`);
      }
    );
    setSignUpSuccess(true);
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
