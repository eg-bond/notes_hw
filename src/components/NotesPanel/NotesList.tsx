import { AppRoutes, Colors } from '@/types/generalTypes';
import { NavLink } from 'react-router-dom';
import { NavLink as MantineNavlink, Menu } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { Note } from '@/types/dbTypes';

interface NotesListProps {
  notesList: Note[];
  openEditNoteTitleModal: (noteId: number, title: string) => void;
}

export const NotesList: React.FC<NotesListProps> = ({
  notesList,
  openEditNoteTitleModal,
}) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent, noteId: number) => {
      event.preventDefault();
      setOpenMenuId(noteId);
    },
    [setOpenMenuId]
  );

  return (
    <ul style={{ padding: 0, margin: 0 }}>
      {notesList.map(note => (
        <li key={note.id} style={{ listStyle: 'none' }}>
          <Menu
            opened={openMenuId === note.id}
            onClose={() => setOpenMenuId(null)}
            closeOnItemClick>
            <Menu.Target>
              <div onContextMenu={e => handleContextMenu(e, note.id)}>
                <MantineNavlink
                  variant='filled'
                  fw={'bold'}
                  p={'sm'}
                  autoContrast
                  color={Colors.Blue}
                  description={note.title}
                  to={`/${AppRoutes.Notes}/${note.id}`}
                  onClick={close}
                  component={NavLink}
                />
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => openEditNoteTitleModal(note.id, note.title)}
                color={Colors.Orange}
                leftSection={<IconPencil />}>
                Изменить название
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </li>
      ))}
    </ul>
  );
};
