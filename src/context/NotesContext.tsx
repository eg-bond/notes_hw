import React, { createContext, useContext } from 'react';
import { db, Note } from '@/database/db';
import { useAuthContext } from './AuthProvider';
import { useLiveQuery } from 'dexie-react-hooks';

interface INotesContext {
  notesList: Array<Note>;
  addNote: (title: string) => void;
  deleteNote: (id: string) => void;
  getNoteContentFromDB: (id: string) => Promise<string | undefined>;
  updateNoteContent: (id: string, content: string) => void;
}

const NotesContext = createContext<INotesContext>({} as INotesContext);

export function useNotesContext() {
  return useContext(NotesContext);
}

interface INotesProviderProps {
  children: React.ReactNode;
}

export function NotesProvider({ children }: INotesProviderProps) {
  const auth = useAuthContext();

  const notesList = useLiveQuery(
    () => db.notes.where({ userId: auth?.userId || 0 }).toArray(),
    [auth?.userId],
    []
  );

  async function addNote(title: string) {
    const newNote = { userId: auth?.userId as number, title, content: '' };
    return await db.notes.add(newNote);
  }

  function deleteNote(id: string) {
    db.notes.delete(Number(id));
  }

  function updateNoteContent(id: string, content: string) {
    db.notes.update(Number(id), {
      content,
    });
  }

  async function getNoteContentFromDB(id: string) {
    const note = await db.notes.get(Number(id));
    return note?.content;
  }

  const value = {
    notesList,
    addNote,
    deleteNote,
    getNoteContentFromDB,
    updateNoteContent,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
