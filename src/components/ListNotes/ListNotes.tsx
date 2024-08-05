import { AppRoutes } from '@/types/generalTypes';
import { NavLink as MantineNavlink } from '@mantine/core';
import { NavLink } from 'react-router-dom';

export function ListNotes({ notes, close }) {
  return (
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
  );
}
