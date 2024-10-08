import { useNavigate, useParams } from 'react-router-dom';
import { useEditor } from '@tiptap/react';
import { useNotes } from '@/context/NotesContext';
import { useEffect, useRef, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { findNextArrElementIndex } from '@/helpers/findNextElementIndex';
import { AppRoutes } from '@/types/generalTypes';
import { SelectedNote } from './SelectedNote';
import { RichTextEditor } from '@mantine/tiptap';

export function SelectedNoteContainer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notesList, getNoteContentFromDB, updateNoteContentInDB, deleteNote } =
    useNotes();
  const [editable, setEditable] = useState(false);
  const isDeleting = useRef(false);

  const debUpdateNoteContentInDB = useDebouncedCallback(
    (id: string, updContent: string) => {
      updateNoteContentInDB(id, updContent);
    },
    2000
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    // event, triggered after every editor content change
    onUpdate: () => {
      debUpdateNoteContentInDB(id as string, editor?.getHTML() as string);
    },
    content: getNoteContentFromDB(id),
  });

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

  useEffect(() => {
    // immediately saves content of prev note in DB after switch to another note
    // don't do that if note is in deletion process
    if (isDeleting.current === false) {
      debUpdateNoteContentInDB.flush();
    }
    // sets content of current note 'id' to editors instance content
    editor?.commands.setContent(getNoteContentFromDB(id));
    // sets editable to false after changing notes
    setEditable(false);
  }, [id]);

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editor, editable]);

  return (
    <RichTextEditor editor={editor}>
      <SelectedNote
        noteId={id as string}
        editable={editable}
        setEditable={setEditable}
        deleteNoteHandler={deleteNoteHandler}
      />
    </RichTextEditor>
  );
}
