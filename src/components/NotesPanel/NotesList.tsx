import { AppRoutes } from '@/types/generalTypes';
import { NavLink } from 'react-router-dom';
import { NavLink as MantineNavlink, Menu, rem } from '@mantine/core';
import { Note } from '@/database/db';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

interface NotesListProps {
  notesList: Note[];
  openEditNoteTitleModal: (noteId: number, title: string) => void;
}

export const NotesList: React.FC<NotesListProps> = ({
  notesList,
  openEditNoteTitleModal,
}) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleContextMenu = (event: React.MouseEvent, noteId: number) => {
    event.preventDefault();
    setOpenMenuId(noteId);
  };

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
                color='indigo'
                leftSection={
                  <IconPencil style={{ width: rem(14), height: rem(14) }} />
                }>
                Изменить название
              </Menu.Item>
              {/* <Menu.Item
                color='red'
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }>
                Удалить заметку
              </Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </li>
      ))}
    </ul>
  );
};
