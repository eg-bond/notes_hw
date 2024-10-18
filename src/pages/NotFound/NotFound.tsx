import { AppRoutes, Styles } from '@/types/generalTypes';
import { Box, Button, Center, em, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconFaceIdError } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width: ${em(Styles.MobileWidth)})`);

  return (
    <Box
      style={theme => ({
        backgroundColor: theme.colors.gray[0],
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
      })}>
      <Center>
        <IconFaceIdError size={64} color='gray' />
      </Center>
      <Title size={isMobile ? '6vw' : '35px'} mt='md'>
        Страница не найдена
      </Title>
      <Text size={isMobile ? '2.5vw' : '16px'} mt='sm'>
        Страница, которую вы ищете, не существует или была перемещена.
      </Text>
      <Button
        onClick={() => navigate('/' + AppRoutes.Notes)}
        variant='outline'
        mt='lg'
        color='blue'
        radius={Styles.BtnRadius}>
        На главную
      </Button>
    </Box>
  );
}
