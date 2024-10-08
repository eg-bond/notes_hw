import { useNotes } from '@/context/NotesContext';
import { AppRoutes } from '@/types/generalTypes';
import { Input, NavLink as MantineNavlink, Transition } from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useState } from 'react';
import { useInputState } from '@mantine/hooks';

interface IListNotesProps {
  close: () => void;
}

export function ListNotes({ close }: IListNotesProps) {
  const navigate = useNavigate();
  const notesContext = useNotes();
  const notesList = notesContext?.notesList;

  const [input, showInput] = useState(false);
  const [inputValue, setInputValue] = useInputState('');

  const handleSubmit = () => {
    const newNoteId = crypto.randomUUID();
    notesContext?.addNote(newNoteId, inputValue);
    navigate(`/${AppRoutes.Notes}/${newNoteId}`);

    setInputValue('');
    showInput(false);
  };
  const handleReset = () => {
    setInputValue('');
    showInput(false);
  };

  if (!notesList) return null;

  return (
    <div>
      <ul style={{ padding: 0, margin: 0 }}>
        {notesList.map(note => (
          <NoteLink note={note} key={note.id} />
        ))}
      </ul>
      {input ? (
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <Input
            placeholder='Note title'
            value={inputValue}
            autoFocus
            onChange={setInputValue}
            onSubmit={handleSubmit}
          />
          <Button type='submit' variant='filled' color='green'>
            Create Note
          </Button>
          <Button type='reset' variant='filled' color='red'>
            Delete
          </Button>
        </form>
      ) : (
        <Button onClick={() => showInput(true)} variant='filled' color='indigo'>
          Add note
        </Button>
      )}
    </div>
  );
}

function NoteLink({ note }) {
  return (
    <li style={{ listStyle: 'none' }}>
      <MantineNavlink
        variant='filled'
        fw={'bold'}
        description={note.title}
        to={`/${AppRoutes.Notes}/${note.id}`}
        onClick={close}
        component={NavLink}
      />
    </li>
  );
}
