import { useNavigate } from 'react-router-dom';
import { Button, Flex, Text } from '@mantine/core';
import { AppRoutes, Colors } from '@/types/generalTypes';

export function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <Flex direction={'column'} align={'center'} gap={'lg'} mt={'20vh'}>
        <Text
          size='40px'
          fw={900}
          variant='gradient'
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          component='h1'>
          Заметки
        </Text>
        <Text size='20px' fw={700}>
          Ваша цифровая записная книжка
        </Text>
        <Flex gap={'md'} mt={'sm'}>
          <Button
            onClick={() => navigate(AppRoutes.SignIn)}
            justify='center'
            variant='filled'
            color={Colors.Green}
            size='xl'
            w={'200px'}
            radius={'0'}>
            Вход
          </Button>
          <Button
            onClick={() => navigate(AppRoutes.SignUp)}
            justify='center'
            variant='outline'
            color={Colors.Blue}
            size='xl'
            w={'200px'}
            radius={'0'}>
            Регистрация
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
