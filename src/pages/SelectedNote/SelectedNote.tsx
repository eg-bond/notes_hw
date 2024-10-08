import { useNavigate, useParams } from 'react-router-dom';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import { useNotes } from '@/context/NotesContext';
import { useEffect, useRef, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { TextEditorToolbar } from '@/components/TextEditor';
import { Button } from '@mantine/core';
import { useImmediateDebouncedCallback } from '@/hooks/useImmediateDebouncedCallback';
import { findNextArrElementIndex } from '@/helpers/findNextElementIndex';
import { AppRoutes } from '@/types/generalTypes';

export function SelectedNote() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notesList, getNoteContentFromDB, updateNoteContentInDB, deleteNote } =
    useNotes();
  const isDeleting = useRef(false);
  const [editable, setEditable] = useState(false);
  const content = getNoteContentFromDB(id);

  const updateHandler = (id: string, updContent: string) => {
    debUpdateNoteContentInDB(id, updContent);
  };

  const debUpdateNoteContentInDB = useImmediateDebouncedCallback(
    (id: string, updContent: string) => {
      updateNoteContentInDB(id, updContent);
    },
    1500
  );

  const deleteNoteHandler = (id: string) => {
    isDeleting.current = true;

    const nextIndex = findNextArrElementIndex(
      notesList,
      notesList.findIndex(item => item.id === id)
    );

    deleteNote(id);

    if (nextIndex !== -1) {
      navigate(`/${AppRoutes.Notes}/${notesList[nextIndex].id}`);
    } else {
      navigate(`/${AppRoutes.Notes}`);
    }

    isDeleting.current = false;
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    onUpdate: () => {
      updateHandler(id as string, editor?.getHTML() as string);
    },
    content,
  });

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editable]);

  useEffect(() => {
    // immediately saves unsaved content of prev note in DB
    if (isDeleting.current === false) {
      debUpdateNoteContentInDB.flush();
    }
    // sets content of current note 'id' to editors content
    editor?.commands.setContent(getNoteContentFromDB(id));
    // sets editable to false after changing note
    setEditable(false);
  }, [id]);

  return (
    <div>
      {!editable && (
        <Button color='orange' onClick={() => setEditable(true)}>
          Edit note
        </Button>
      )}
      <Button color='red' onClick={() => deleteNoteHandler(id)}>
        Delete note
      </Button>

      <RichTextEditor editor={editor}>
        {editable && <TextEditorToolbar />}
        <RichTextEditor.Content />
      </RichTextEditor>
    </div>
  );
}
