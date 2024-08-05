import { AppShell, Burger, ScrollArea } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from 'react-router-dom';
import { NavLink as MantineNavlink } from '@mantine/core';
import { AppRoutes } from '@/types/generalTypes';

export function ListNotes() {
  const [opened, { toggle, close }] = useDisclosure();

  const notes = [
    {
      id: 1,
      title: 'Note 1',
      content: 'Content of Note 1',
    },
    {
      id: 2,
      title: 'Note 2',
      content: 'Content of Note 2',
    },
    {
      id: 3,
      title: 'Note 3',
      content: 'Content of Note 3',
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
          <ul style={{ padding: 0, margin: 0 }}>
            {notes.map(note => (
              <li key={note.id} style={{ listStyle: 'none' }}>
                <MantineNavlink
                  variant='filled'
                  fw={'bold'}
                  description={note.title}
                  to={`/${AppRoutes.Notes}/${note.id}`}
                  onClick={close}
                  component={NavLink}
                />
              </li>
            ))}
          </ul>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
