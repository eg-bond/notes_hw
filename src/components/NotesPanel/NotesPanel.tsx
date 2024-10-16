import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useNotesContext } from '@/context/NotesContext';
import { AppRoutes } from '@/types/generalTypes';
import { AddNoteForm } from './AddNoteForm';
import { NotesList } from './NotesList';
import { isNotEmpty, useForm } from '@mantine/form';

export const addNoteInputName = 'add_note';

export function NotesPanel() {
  const navigate = useNavigate();
  const { notesList, addNote } = useNotesContext();
  const [isInputVisible, setInputVisible] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: {
      [addNoteInputName]: '',
    },
    validate: {
      [addNoteInputName]: isNotEmpty('Название не может быть пустым'),
    },
  });

  const handleAddNote = async (values: typeof form.values) => {
    const result = await addNote(values[addNoteInputName]);
    if (result.success) {
      navigate(`/${AppRoutes.Notes}/${result.id}`);
      setInputVisible(false);
      form.reset();
    } else {
      form.setFieldError('add_note', result.message);
    }
  };

  if (!notesList) return null;

  return (
    <div>
      <NotesList notesList={notesList} />
      {isInputVisible ? (
        <AddNoteForm form={form} handleSubmit={handleAddNote} />
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
