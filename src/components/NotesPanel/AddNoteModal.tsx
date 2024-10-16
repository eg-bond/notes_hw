import { useNavigate } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { useNotesContext } from '@/context/NotesContext';
import { AppRoutes } from '@/types/generalTypes';
import { AddNoteForm } from './AddNoteForm';
import { UseFormReturnType } from '@mantine/form';
import { addNoteInputName, useNoteModal } from './NotesPanel';

interface IAddNoteModal {
  form: UseFormReturnType<
    {
      add_note: string;
    },
    (values: { add_note: string }) => {
      add_note: string;
    }
  >;
  addNoteModal: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
}

export const AddNoteModal = ({ form, addNoteModal }: IAddNoteModal) => {
  const navigate = useNavigate();
  const { addNote } = useNotesContext();

  const handleAddNote = async (values: typeof form.values) => {
    const result = await addNote(values[addNoteInputName]);
    if (result.success) {
      navigate(`/${AppRoutes.Notes}/${result.id}`);
      addNoteModal.close();
      form.reset();
    } else {
      form.setFieldError('add_note', result.message);
    }
  };

  return (
    <Modal
      opened={addNoteModal.isOpen}
      onClose={() => {
        addNoteModal.close(), form.reset();
      }}
      title='Новая заметка'>
      <AddNoteForm
        form={form}
        handleSubmit={handleAddNote}
        onReset={() => {
          addNoteModal.close(), form.reset();
        }}
      />
    </Modal>
  );
};
