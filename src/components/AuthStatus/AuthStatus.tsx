import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { Box, Button, Flex, Text } from '@mantine/core';
import { AppRoutes, Colors } from '@/types/generalTypes';

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
      <Button
        h={'40px'}
        radius={'0'}
        color={Colors.Red}
        onClick={handleSignOut}>
        Выйти
      </Button>
    );
  }

  return (
    <Flex columnGap='md' justify='center' align='flex-end'>
      {/* if user is logged in */}
      {user && (
        <>
          <Box style={{ alignSelf: 'center' }} maw={125} ta={'center'}>
            <Text
              tt='capitalize'
              size='md'
              ta='end'
              truncate='end'
              c={Colors.Blue}>
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
