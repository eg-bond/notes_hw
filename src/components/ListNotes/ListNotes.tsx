import { useNotes } from '@/context/NotesContext';
import { AppRoutes, NotesListT } from '@/types/generalTypes';
import { CloseButton, Input, NavLink as MantineNavlink } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useState } from 'react';
import { useInputState } from '@mantine/hooks';

interface IListNotesProps {
  notes: NotesListT;
  close: () => void;
}

export function ListNotes({ notes, close }: IListNotesProps) {
  const notesContext = useNotes();
  const notesList = notesContext?.notesList;

  const [input, showInput] = useState(false);
  const [inputValue, setInputValue] = useInputState('');

  const handleSubmit = () => {
    notesContext?.addNote(inputValue);
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
