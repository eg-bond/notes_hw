import { useState } from 'react';
import { Button, Flex } from '@mantine/core';
import { useNotesContext } from '@/context/NotesContext';
import { NotesList } from './NotesList';
import { isNotEmpty, useForm } from '@mantine/form';
import { AddNoteModal } from './AddNoteModal';
import { EditNoteTitleModal } from './EditNoteTitleModal';
import { useNoteModal } from '@/hooks/useNoteModal';
import { Note } from '@/types/dbTypes';
import { Colors } from '@/types/generalTypes';
import { IconPlus } from '@tabler/icons-react';

export const addNoteInputName = 'add_note';

// const makeTestNotesList = (amount: number) => {
//   const notesList = [] as Note[];
//   for (let i = 0; i < amount; i++) {
//     notesList.push({
//       id: i,
//       userId: i,
//       title: `Note ${i}`,
//       content: `Content ${i}`,
//     });
//   }
//   return notesList;
// };
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
    <>
      <NotesList
        notesList={notesList}
        openEditNoteTitleModal={openEditNoteTitleModal}
      />
      <Button
        onClick={addNoteModal.open}
        justify='center'
        fullWidth
        leftSection={<IconPlus />}
        variant='default'
        mt='sm'
        radius={'0'}>
        Добавить заметку
      </Button>

      <AddNoteModal form={form} addNoteModal={addNoteModal} />

      <EditNoteTitleModal
        form={form}
        editNoteTitleModal={editNoteTitleModal}
        noteIdToEdit={noteIdToEdit}
      />
    </>
  );
}
