import { AppShell, Burger, ScrollArea } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { NotesPanel } from '@/components/NotesPanel';
import { SearchBox } from '@/components/SearchBox';
import { AuthStatus } from '@/components/AuthStatus';

export function MainLayout() {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}>
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} size='sm' />
        <SearchBox />
        <AuthStatus />
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section grow component={ScrollArea}>
          <NotesPanel />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
