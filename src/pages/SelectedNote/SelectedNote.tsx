import { RichTextEditor } from '@mantine/tiptap';
import { TextEditorToolbar } from '@/components/TextEditor';
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

interface ISelectedNote {
  noteId: string;
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  deleteNoteHandler: (id: string) => void;
}
export function SelectedNote({
  noteId,
  editable,
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

      {editable && <TextEditorToolbar />}
      <RichTextEditor.Content />
    </div>
  );
}
