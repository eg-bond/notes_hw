import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMemo } from 'react';
import SimpleMdeReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import Markdown from 'marked-react';
import 'easymde/dist/easymde.min.css';
interface ISelectedNote {
  noteId: string;
  content: string | null;
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
      title: 'Подтверждение удаления',
      centered: true,
      children: (
        <Text size='sm'>Вы уверены, что хотите удалить эту заметку?</Text>
      ),
      labels: { confirm: 'Удалить', cancel: 'Отмена' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteNoteHandler(noteId),
    });

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    } as SimpleMDE.Options;
  }, []);

  if (content === null) return <div>Заметки с таким id не существует!</div>;

  return (
    <div>
      {!editable && (
        <Button color='orange' onClick={() => setEditable(true)}>
          Редактировать заметку
        </Button>
      )}
      <Button color='red' onClick={openDeleteModal}>
        Удалить заметку
      </Button>

      {editable ? (
        <SimpleMdeReact
          value={content}
          onChange={onChange}
          options={autofocusNoSpellcheckerOptions}
        />
      ) : (
        <Markdown>{content}</Markdown>
      )}
    </div>
  );
}
