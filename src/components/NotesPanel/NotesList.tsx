import { AppRoutes } from '@/types/generalTypes';
import { NavLink } from 'react-router-dom';
import { NavLink as MantineNavlink } from '@mantine/core';
import { Note } from '@/database/db';

// NotesList.tsx
interface NotesListProps {
  notesList: Note[];
}

export const NotesList: React.FC<NotesListProps> = ({ notesList }) => (
  <ul style={{ padding: 0, margin: 0 }}>
    {notesList.map(note => (
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
