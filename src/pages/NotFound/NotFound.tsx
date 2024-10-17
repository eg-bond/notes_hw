import { AppRoutes } from '@/types/generalTypes';
import { Box, Button, Center, Text, Title } from '@mantine/core';
import { IconFaceIdError } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

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
      <Title mt='md'>Страница не найдена</Title>
      <Text mt='sm'>
        Страница, которую вы ищете, не существует или была перемещена.
      </Text>
      <Button
        onClick={() => navigate('/' + AppRoutes.Notes)}
        variant='outline'
        mt='lg'
        color='blue'
        radius='md'>
        На главную
      </Button>
    </Box>
  );
}
