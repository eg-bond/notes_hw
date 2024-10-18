import { Modal } from '@mantine/core';
import { useNotesContext } from '@/context/NotesContext';
import { AddNoteForm } from './AddNoteForm';
import { UseFormReturnType } from '@mantine/form';
import { addNoteInputName } from './NotesPanel';

interface IEditNoteTitleModal {
  form: UseFormReturnType<
    {
      add_note: string;
    },
    (values: { add_note: string }) => {
      add_note: string;
    }
  >;
  editNoteTitleModal: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  noteIdToEdit: number;
}

export const EditNoteTitleModal = ({
  form,
  editNoteTitleModal,
  noteIdToEdit,
}: IEditNoteTitleModal) => {
  const { editNoteTitle } = useNotesContext();

  const handleEditNoteTitle = async (values: typeof form.values) => {
    const result = await editNoteTitle(noteIdToEdit, values[addNoteInputName]);
    if (result.success) {
      editNoteTitleModal.close();
      form.reset();
    } else {
      form.setFieldError(addNoteInputName, result.message);
    }
  };

  return (
    <Modal
      opened={editNoteTitleModal.isOpen}
      onClose={() => {
        editNoteTitleModal.close();
        form.reset();
      }}
      title='Изменить название'>
      <AddNoteForm
        form={form}
        handleSubmit={handleEditNoteTitle}
        onReset={() => {
          editNoteTitleModal.close(), form.reset();
        }}
      />
    </Modal>
  );
};
