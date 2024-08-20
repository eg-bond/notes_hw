import { useNavigate, useParams } from 'react-router-dom';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import { useNotes } from '@/context/NotesContext';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from '@mantine/hooks';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { TextEditorToolbar } from '@/components/TextEditor';
import { Button } from '@mantine/core';

export function SelectedNote() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notesList, getNoteContent, setNoteContent, deleteNote } = useNotes();

  const content = getNoteContent(id);

  const updateHandler = (id: string, updContent: string) => {
    debSetNoteContent(id, updContent);
  };

  const debSetNoteContent = useDebouncedCallback(
    (id: string, updContent: string) => {
      setNoteContent(id, updContent);
    },
    1500
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteNoteHandler = (id: string) => {
    setIsDeleting(true);
    deleteNote(id);
    navigate('/notes/1');
    setIsDeleting(false);
  };

  const prevId = useRef<string | undefined>(id);

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
    // immediately saves unsaved content of prev note in DB
    if (!isDeleting) {
      console.log('i am in setNote');

      setNoteContent(prevId.current as string, editor?.getHTML() as string);
      prevId.current = id;
    }
    // sets content of current note 'id' to editors content
    editor?.commands.setContent(getNoteContent(id));
  }, [id]);

  return (
    <div>
      <Button color='red' onClick={() => deleteNoteHandler(id)}>
        Delete note
      </Button>
      <RichTextEditor editor={editor}>
        <TextEditorToolbar />
        <RichTextEditor.Content />
      </RichTextEditor>
    </div>
  );
}
