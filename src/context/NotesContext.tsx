import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { db, Note } from '@/database/db';
import { useAuthContext } from './AuthProvider';
import { useLiveQuery } from 'dexie-react-hooks';

type randomUUID_T = ReturnType<typeof crypto.randomUUID>;

export type NotesListItemT = {
  id: randomUUID_T;
  title: string;
};

interface INotesContext {
  notesList: Array<NotesListItemT>;
  addNote: (title: string) => void;
  deleteNote: (id: number) => void;
  getNoteContentFromDB: (id: number) => Promise<string | undefined>;
  updateNoteContent: (id: number, content: string) => void;
}

const NotesContext = createContext<INotesContext>({} as INotesContext);

export function useNotesContext() {
  return useContext(NotesContext);
}

interface INotesProviderProps {
  children: React.ReactNode;
}

// Provider component
export function NotesProvider({ children }: INotesProviderProps) {
  const auth = useAuthContext();

  const notesList = useLiveQuery(
    () => db.notes.where({ userId: auth?.userId || 0 }).toArray(),
    [auth?.userId],
    []
  );

  async function addNote(title: string) {
    const newNote = { userId: auth?.userId as number, title, content: '' };
    await db.notes.add(newNote);
  }

  function deleteNote(id: number) {
    db.notes.delete(id);
  }

  function updateNoteContent(id: number, content: string) {
    db.notes.update(id, {
      content,
    });
  }

  async function getNoteContentFromDB(id: number) {
    const note = await db.notes.get(id);
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
