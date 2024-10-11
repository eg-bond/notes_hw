import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMemo } from 'react';
import SimpleMdeReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
interface ISelectedNote {
  noteId: string;
  content: string;
  editable: boolean;
  onChange: (value: string) => void;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  deleteNoteHandler: (id: string) => void;
}
export function SelectedNote({
  noteId,
  content,
  editable,
  onChange,
  setEditable,
  deleteNoteHandler,
}: ISelectedNote) {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete note',
      centered: true,
      children: (
        <Text size='sm'>Are you sure you want to delete this note?</Text>
      ),
      labels: { confirm: 'Delete it', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteNoteHandler(noteId),
    });

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    } as SimpleMDE.Options;
  }, []);

  return (
    <div>
      {!editable && (
        <Button color='orange' onClick={() => setEditable(true)}>
          Edit note
        </Button>
      )}
      <Button color='red' onClick={openDeleteModal}>
        Delete note
      </Button>

      {editable && (
        <SimpleMdeReact
          value={content}
          onChange={onChange}
          options={autofocusNoSpellcheckerOptions}
        />
      )}
    </div>
  );
}
