import { AppRoutes, NotesListT } from '@/types/generalTypes';
import { NavLink as MantineNavlink } from '@mantine/core';
import { NavLink } from 'react-router-dom';

interface IListNotesProps {
  notes: NotesListT;
  close: () => void;
}

export function ListNotes({ notes, close }: IListNotesProps) {
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
