import { AppShell, Burger, Flex, Group, ScrollArea } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { NotesPanel } from '@/components/NotesPanel';
import { SearchBox } from '@/components/SearchBox';
import { AuthStatus } from '@/components/AuthStatus';
import { Styles } from '@/types/generalTypes';

export function MainLayout() {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      header={{ height: Styles.HeaderHeight }}
      navbar={{
        width: Styles.NavbarWidth,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}>
      <AppShell.Header color='blue'>
        <Flex
          rowGap='sm'
          direction={'row'}
          justify='space-between'
          h='100%'
          align='center'
          wrap={'nowrap'}>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
          <Group wrap={'nowrap'} ml={'auto'} gap={'md'}>
            <SearchBox />
            <AuthStatus />
          </Group>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section onClick={() => close()} grow component={ScrollArea}>
          <NotesPanel />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
