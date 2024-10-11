import { useNotesContext } from '@/context/NotesContext';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import SimpleMDE from 'easymde';
import SimpleMdeReact from 'react-simplemde-editor';

export const TestDB = () => {
  const { id } = useParams<{ id: string }>();
  const { notesList, updateNoteContent, deleteNote, getNoteContentFromDB } =
    useNotesContext();
  const [content, setContent] = useState('Initial value');

  // const dbNote1 = useLiveQuery(() => db.notes.get({ id: 1 }), [], []);
  // const dbNote2 = useLiveQuery(() => db.notes.get({ id: 2 }), [], []);
  // const dbNote5 = useLiveQuery(() => db.notes.get({ id: 5 }), [], []);

  const debUpdateNoteContentInDB = useDebouncedCallback(
    (id: string, updContent: string) => {
      updateNoteContent(+id, updContent);
    },
    1000
  );

  useEffect(() => {
    if (id) {
      getNoteContentFromDB(+id).then(res => {
        setContent(res);
      });
    }
  }, [id]);

  const onChange = useCallback(
    (value: string) => {
      setContent(value);
      debUpdateNoteContentInDB(+id!, value);
    },
    [id]
  );

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    } as SimpleMDE.Options;
  }, []);

  return (
    <div>
      <h1>TestDB</h1>
      <div>
        <NavLink to={'/test_db/1'}>link1</NavLink>
        <NavLink to={'/test_db/2'}>link2</NavLink>
        <NavLink to={'/test_db/4'}>link4</NavLink>
      </div>
      <h1>{id}</h1>
      {/* <h1>Note1Db content: {dbNote1.content}</h1>
      <h1>Note2Db content: {dbNote2.content}</h1>
      <h1>Note2Db content: {dbNote5.content}</h1> */}

      <div style={{ margin: '0 2rem', border: '1px solid black' }}>
        <SimpleMdeReact
          value={content}
          onChange={onChange}
          options={autofocusNoSpellcheckerOptions}
        />
      </div>
    </div>
  );
};
