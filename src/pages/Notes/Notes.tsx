import { AppShell, Burger, ScrollArea } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

export function Notes() {
  const [opened, { toggle }] = useDisclosure();

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
          <div style={{ padding: '60px', border: 'solid 2px black' }}>nav</div>
          <div style={{ padding: '60px', border: 'solid 2px black' }}>nav</div>
          <div style={{ padding: '60px', border: 'solid 2px black' }}>nav</div>
          <div style={{ padding: '60px', border: 'solid 2px black' }}>nav</div>
          <div style={{ padding: '60px', border: 'solid 2px black' }}>nav</div>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
