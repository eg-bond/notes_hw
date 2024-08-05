import { AppShell, Burger, ScrollArea } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { ListNotes } from '@/components/ListNotes';

export function MainLayout() {
  const [opened, { toggle, close }] = useDisclosure();

  const notes = [
    {
      id: 1,
      title: 'Note 1',
    },
    {
      id: 2,
      title: 'Note 2',
    },
    {
      id: 3,
      title: 'Note 3',
    },
  ];

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
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section grow component={ScrollArea}>
          <ListNotes notes={notes} close={close} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet context={notes} />
      </AppShell.Main>
    </AppShell>
  );
}
