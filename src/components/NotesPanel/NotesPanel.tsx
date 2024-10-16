import { useState } from 'react';
import { Button } from '@mantine/core';
import { useNotesContext } from '@/context/NotesContext';
import { NotesList } from './NotesList';
import { isNotEmpty, useForm } from '@mantine/form';
import { AddNoteModal } from './AddNoteModal';
import { EditNoteTitleModal } from './EditNoteTitleModal';
import { useNoteModal } from '@/hooks/useNoteModal';

export const addNoteInputName = 'add_note';

export function NotesPanel() {
  const { notesList } = useNotesContext();
  const addNoteModal = useNoteModal();
  const editNoteTitleModal = useNoteModal();
  const [noteIdToEdit, setNoteIdToEdit] = useState<number>(0);

  const openEditNoteTitleModal = (noteId: number, title: string) => {
    form.setFieldValue(addNoteInputName, title);
    editNoteTitleModal.open();
    setNoteIdToEdit(noteId);
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      [addNoteInputName]: '',
    },
    validate: {
      [addNoteInputName]: isNotEmpty('Название не может быть пустым'),
    },
  });

  if (!notesList) return null;

  return (
    <div>
      <NotesList
        notesList={notesList}
        openEditNoteTitleModal={openEditNoteTitleModal}
      />
      <Button onClick={addNoteModal.open} variant='filled' color='indigo'>
        Add note
      </Button>

      <AddNoteModal form={form} addNoteModal={addNoteModal} />

      <EditNoteTitleModal
        form={form}
        editNoteTitleModal={editNoteTitleModal}
        noteIdToEdit={noteIdToEdit}
      />
    </div>
  );
}
