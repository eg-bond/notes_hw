import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useNotesContext } from '@/context/NotesContext';
import { useInputState } from '@mantine/hooks';
import { AppRoutes } from '@/types/generalTypes';
import { AddNoteForm } from './AddNoteForm';
import { NotesList } from './NotesList';

export const INITIAL_NOTE_TITLE = 'Без заголовка';

export function NotesPanel() {
  const navigate = useNavigate();
  const { notesList, addNote } = useNotesContext();
  const [isInputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useInputState(INITIAL_NOTE_TITLE);

  const handleAddNote = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newNoteId = crypto.randomUUID();

      addNote(newNoteId, inputValue);
      navigate(`/${AppRoutes.Notes}/${newNoteId}`);
      setInputValue(INITIAL_NOTE_TITLE);
      setInputVisible(false);
    },
    [inputValue, addNote, navigate, setInputValue]
  );

  if (!notesList) return null;

  return (
    <div>
      <NotesList notesList={notesList} />
      {isInputVisible ? (
        <AddNoteForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleAddNote}
          resetForm={() => {
            setInputValue(INITIAL_NOTE_TITLE);
            setInputVisible(false);
          }}
        />
      ) : (
        <Button
          onClick={() => setInputVisible(true)}
          variant='filled'
          color='indigo'>
          Add note
        </Button>
      )}
    </div>
  );
}
