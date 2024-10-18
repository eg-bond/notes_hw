import { useNavigate, useParams } from 'react-router-dom';
import { useNotesContext } from '@/context/NotesContext';
import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { findNextNoteId } from '@/helpers/utillityHelpers';
import { AppRoutes } from '@/types/generalTypes';
import { SelectedNote } from './SelectedNote';

export function SelectedNoteContainer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notesList, updateNoteContent, deleteNote, getNoteContentFromDB } =
    useNotesContext();
  // stores content of current note
  const [content, setContent] = useState<string | null>('');
  // enables or disables editor
  const [editable, setEditable] = useState(false);

  // debounced updateNoteContent function
  const debUpdateNoteContentInDB = useDebouncedCallback(
    (id: string, updContent: string) => {
      updateNoteContent(id, updContent);
    },
    1000
  );
  // function passed to SimpleMdeReact onChange prop
  // updates content in local state and invokes content saving in the DB
  const onChange = useCallback(
    (value: string) => {
      setContent(value);
      debUpdateNoteContentInDB(id as string, value);
    },
    [id]
  );

  const deleteNoteHandler = useCallback(
    async (id: string) => {
      try {
        const nextNoteId = findNextNoteId(
          notesList,
          notesList.findIndex(item => item.id.toString() === id)
        );

        const result = await deleteNote(id);

        if (!result.success) {
          throw new Error(result.message || 'Не удалось удалить заметку');
        }

        if (nextNoteId !== -1) {
          navigate(`/${AppRoutes.Notes}/${nextNoteId}`);
        } else {
          navigate(`/${AppRoutes.Notes}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [notesList, deleteNote, navigate]
  );

  useEffect(() => {
    // fetches content of current note from DB and sets it into local state
    if (id) {
      getNoteContentFromDB(id).then(res => {
        if (res.success) {
          setContent(res.content);
        } else {
          setContent(null);
        }
      });
    }
    // disables editor after switching to another note
    setEditable(false);

    // immediately saves note content in the DB before switching to another note
    return () => {
      debUpdateNoteContentInDB.flush();
    };
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
