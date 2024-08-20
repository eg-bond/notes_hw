import { useParams } from 'react-router-dom';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import { useNotes } from '@/context/NotesContext';
import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from '@mantine/hooks';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { TextEditorToolbar } from '@/components/TextEditor';

export function SelectedNote() {
  const { id } = useParams<{ id: string }>();
  const { getNoteContent, setNoteContent } = useNotes();

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
    setNoteContent(prevId.current as string, editor?.getHTML() as string);
    prevId.current = id;
    // sets content of current note 'id' to editors content
    editor?.commands.setContent(getNoteContent(id));
  }, [id]);

  return (
    <div>
      <RichTextEditor editor={editor}>
        <TextEditorToolbar />
        <RichTextEditor.Content />
      </RichTextEditor>
    </div>
  );
}
