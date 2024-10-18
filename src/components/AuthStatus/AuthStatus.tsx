import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { Box, Button, Flex, Text } from '@mantine/core';
import { AppRoutes, Colors } from '@/types/generalTypes';

export const AuthStatus = () => {
  const { signOut, user } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      navigate(AppRoutes.Main);
    } else {
      console.error(result.message);
    }
  };

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
      <Box style={{ alignSelf: 'center' }} maw={125} ta={'center'}>
        <Text tt='capitalize' size='md' ta='end' truncate='end' c={Colors.Blue}>
          {user}
        </Text>
      </Box>
      <ExitBtn />
    </Flex>
  );
};
