import { ActionIcon, Box, Text, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMemo } from 'react';
import SimpleMdeReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import Markdown from 'marked-react';
import 'easymde/dist/easymde.min.css';
import { IconEdit, IconTrashFilled } from '@tabler/icons-react';
import { Colors } from '@/types/generalTypes';
import './simplemdeCustomStyle.css';
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
      confirmProps: { color: Colors.Red, radius: 0 },
      cancelProps: { radius: 0 },
      onConfirm: () => deleteNoteHandler(noteId),
    });

  const editorOptions = useMemo(() => {
    return {
      spellChecker: false,
      toolbar: [
        'bold',
        'italic',
        'heading',
        '|',
        'quote',
        'unordered-list',
        'ordered-list',
        '|',
        'link',
        'image',
        '|',
        'preview',
        '|',
        'guide',
        '|',
      ],
    } as SimpleMDE.Options;
  }, []);

  if (content === null) return <div>Заметки с таким id не существует!</div>;

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: !editable ? '0' : '10px',
          right: '10px',
          display: 'flex',
          gap: '10px',
        }}>
        {!editable && (
          <Tooltip
            color={Colors.Orange}
            position='bottom'
            openDelay={700}
            label='Редактировать заметку'>
            <ActionIcon
              onClick={() => setEditable(true)}
              variant='filled'
              color={Colors.Orange}
              style={{ zIndex: 2 }}
              aria-label='edit_note'>
              <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        )}
        <Tooltip
          color={Colors.Red}
          position='bottom'
          openDelay={700}
          label='Удалить заметку'>
          <ActionIcon
            onClick={openDeleteModal}
            variant='filled'
            color={Colors.Red}
            style={{ zIndex: 2 }}
            aria-label='delete_note'>
            <IconTrashFilled
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
            />
          </ActionIcon>
        </Tooltip>
      </div>

      {editable ? (
        <SimpleMdeReact
          value={content}
          onChange={onChange}
          options={editorOptions}
        />
      ) : (
        <Box ml={'md'}>
          <Markdown>{content === '' ? 'Пустая заметка' : content}</Markdown>
        </Box>
      )}
    </div>
  );
}
