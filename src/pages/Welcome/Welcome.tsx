import { useNavigate } from 'react-router-dom';
import { Button, em, Flex, Text } from '@mantine/core';
import { AppRoutes, Colors, Styles } from '@/types/generalTypes';
import { useMediaQuery } from '@mantine/hooks';

export function WelcomePage() {
  const isMobile = useMediaQuery(`(max-width: ${em(Styles.MobileWidth)})`);
  const navigate = useNavigate();

  return (
    <div>
      <Flex direction={'column'} align={'center'} gap={'lg'} mt={'20vh'}>
        <Text
          size={isMobile ? '7.5vw' : '40px'}
          fw={900}
          variant='gradient'
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          component='h1'>
          Заметки
        </Text>
        <Text size={isMobile ? '4.5vw' : '20px'} fw={700}>
          Ваша цифровая записная книжка
        </Text>
        <Flex gap={'md'} mt={'sm'}>
          <Button
            onClick={() => navigate(AppRoutes.SignIn)}
            justify='center'
            variant='filled'
            color={Colors.Green}
            size='xl'
            w={!isMobile ? '200px' : '40vw'}
            radius={'0'}>
            Вход
          </Button>
          <Button
            onClick={() => navigate(AppRoutes.SignUp)}
            justify='center'
            variant='outline'
            color={Colors.Blue}
            size='xl'
            p={0}
            w={!isMobile ? '200px' : '40vw'}
            radius={Styles.BtnRadius}>
            Регистрация
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
