import { NotesListItemT } from '@/context/NotesContext';
import { AppRoutes } from '@/types/generalTypes';
import { NavLink } from 'react-router-dom';
import { NavLink as MantineNavlink } from '@mantine/core';

// NotesList.tsx
interface NotesListProps {
  notesList: NotesListItemT[];
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
