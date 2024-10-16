import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { Box, Button, Flex, Text } from '@mantine/core';
import { AppRoutes } from '@/types/generalTypes';

export const AuthStatus = () => {
  const { signOut, user } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(() => navigate(AppRoutes.Main));
  };

  function EnterBtn() {
    return (
      <Button color='green' onClick={() => navigate('/' + AppRoutes.SignIn)}>
        Войти
      </Button>
    );
  }

  function ExitBtn() {
    return (
      <Button color='red' onClick={handleSignOut}>
        Выйти
      </Button>
    );
  }

  return (
    <Flex>
      {/* <Flex rowGap='sm' direction={'column'} justify='center' align='flex-end'> */}
      {/* if user is logged in */}
      {user && (
        <>
          <Box w={125}>
            <Text
              tt='capitalize'
              size='lg'
              fw='bold'
              ta='end'
              truncate='end'
              variant='gradient'
              gradient={{ from: 'grape', to: 'red', deg: 90 }}>
              {user}
            </Text>
          </Box>
          <ExitBtn />
        </>
      )}
      {/* if user is not logged in */}
      {!user && <EnterBtn />}
    </Flex>
  );
};
