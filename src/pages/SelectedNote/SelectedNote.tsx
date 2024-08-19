import { useParams } from 'react-router-dom';
import { RichTextEditor } from '@mantine/tiptap';
import { Content, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { useNotes } from '@/context/NotesContext';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from '@mantine/hooks';

export function SelectedNote() {
  const { id } = useParams<{ id: string }>();
  const notesContext = useNotes();

  const [content, setContent] = useState(() =>
    notesContext?.getNoteContent(id)
  );

  useEffect(() => {
    // setContent(notesContext?.getNoteContent(id));
    editor?.commands.setContent(notesContext?.getNoteContent(id) as Content);
  }, [id]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    onUpdate: () => {
      debSetNoteContent();
    },
    // onDestroy: () => {
    //   notesContext?.setNoteContent(id as string, editor?.getHTML() as string);
    // },
    content,
  });

  const debSetNoteContent = useDebouncedCallback(() => {
    console.log('deb', id);
    notesContext?.setNoteContent(id, editor?.getHTML());
  }, 1500);

  return (
    <div>
      {id}
      <RichTextEditor editor={editor}>
        <RTEToolbar />
        <RichTextEditor.Content />
      </RichTextEditor>
    </div>
  );
}

function RTEToolbar() {
  return (
    <RichTextEditor.Toolbar>
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Bold />
        <RichTextEditor.Italic />
        <RichTextEditor.Underline />
        <RichTextEditor.Strikethrough />
        <RichTextEditor.ClearFormatting />
        <RichTextEditor.Highlight />
        <RichTextEditor.Code />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.H1 />
        <RichTextEditor.H2 />
        <RichTextEditor.H3 />
        <RichTextEditor.H4 />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Blockquote />
        <RichTextEditor.Hr />
        <RichTextEditor.BulletList />
        <RichTextEditor.OrderedList />
        <RichTextEditor.Subscript />
        <RichTextEditor.Superscript />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Link />
        <RichTextEditor.Unlink />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.AlignLeft />
        <RichTextEditor.AlignCenter />
        <RichTextEditor.AlignJustify />
        <RichTextEditor.AlignRight />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Undo />
        <RichTextEditor.Redo />
      </RichTextEditor.ControlsGroup>
    </RichTextEditor.Toolbar>
  );
}
