import { useNavigate, useParams } from 'react-router-dom';
import { useNotesContext } from '@/context/NotesContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { findNextNoteId } from '@/helpers/findNextNoteId';
import { AppRoutes } from '@/types/generalTypes';
import { SelectedNote } from './SelectedNote';

export function SelectedNoteContainer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notesList, updateNoteContent, deleteNote, getNoteContentFromDB } =
    useNotesContext();
  const [content, setContent] = useState('');
  const [editable, setEditable] = useState(false);
  const isDeleting = useRef(false);

  const debUpdateNoteContentInDB = useDebouncedCallback(
    (id: string, updContent: string) => {
      updateNoteContent(id, updContent);
    },
    1000
  );

  const onChange = useCallback(
    (value: string) => {
      setContent(value);
      debUpdateNoteContentInDB(id as string, value);
    },
    [id]
  );

  const deleteNoteHandler = (id: string) => {
    isDeleting.current = true;
    const nextNoteId = findNextNoteId(
      notesList,
      notesList.findIndex(item => item.id.toString() === id)
    );

    deleteNote(id);

    if (nextNoteId !== -1) {
      navigate(`/${AppRoutes.Notes}/${nextNoteId}`);
    } else {
      navigate(`/${AppRoutes.Notes}`);
    }
    isDeleting.current = false;
  };

  useEffect(() => {
    if (isDeleting.current === false) {
      debUpdateNoteContentInDB.flush();
    }
    if (id) {
      getNoteContentFromDB(id).then(res => {
        setContent(res || '');
      });
    }
    setEditable(false);
  }, [id]);

  return (
    <SelectedNote
      noteId={id as string}
      content={content}
      onChange={onChange}
      editable={editable}
      setEditable={setEditable}
      deleteNoteHandler={deleteNoteHandler}
    />
  );
}
