import { Box, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import SimpleMdeReact from 'react-simplemde-editor';
import Markdown from 'marked-react';
import 'easymde/dist/easymde.min.css';
import { IconEdit, IconTrashFilled } from '@tabler/icons-react';
import { Colors } from '@/types/generalTypes';
import { editorOptions } from '@/helpers/editorOptions';
import { ActionTooltip } from '../ActionTooltip';
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
    // makes

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

  if (content === null)
    return (
      <Box ml={'md'} mt={'md'}>
        Заметки с таким id не существует!
      </Box>
    );

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
          <ActionTooltip
            label='Редактировать заметку'
            color={Colors.Orange}
            onClick={() => setEditable(true)}
            icon={<IconEdit />}
            ariaLabel='edit_note'
          />
        )}
        <ActionTooltip
          label='Удалить заметку'
          color={Colors.Red}
          onClick={openDeleteModal}
          icon={<IconTrashFilled />}
          ariaLabel='delete_note'
        />
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
