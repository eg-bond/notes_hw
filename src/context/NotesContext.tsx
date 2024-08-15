import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocalStorage } from '@mantine/hooks';

type NoteContentT = {
  markDown: string;
  full: string;
};

type NotesT = {
  [id: number]: NoteContentT;
};

type NotesListItemT = {
  id: number;
  title: string;
};

interface INotesContext {
  notesList: Array<NotesListItemT>;
  addNote: (title: string) => void;
  updateNotesList: (updatedNotesList: Array<NotesListItemT>) => void;
}

const NotesContext = createContext<INotesContext | null>(null);

export function useNotes() {
  return useContext(NotesContext);
}

interface INotesProviderProps {
  children: React.ReactNode;
}

enum LocalStorageKeys {
  IdCounter = 'id_counter',
  Notes = 'notes',
  NotesList = 'notesList',
}

// Provider component
export function NotesProvider({ children }: INotesProviderProps) {
  const [idCounter, setIdCounter] = useLocalStorage<number>({
    key: LocalStorageKeys.IdCounter,
    defaultValue: 0,
  });

  const [notesList, setNotesList] = useLocalStorage<NotesListItemT[]>({
    key: LocalStorageKeys.NotesList,
    defaultValue: [],
  });

  // const [notes, setNotes] = useLocalStorage<NotesT>({
  //   key: LocalStorageKeys.Notes,
  //   defaultValue: {},
  // });

  // Update notes in localStorage
  // function updateNotesInLS(id: number, updatedNote: NoteContentT) {

  //   setNotes((prev) => {...prev, notes[id]: updatedNote} );
  // }

  // add note function
  function addNote(title: string) {
    const updatedNotesList = [...notesList, { id: idCounter + 1, title }];
    setIdCounter(idCounter + 1);
    setNotesList(updatedNotesList);
  }

  // Update notesList in localStorage
  function updateNotesList(updatedNotesList: NotesListItemT[]) {
    setNotesList(updatedNotesList);
  }

  const value = { notesList, updateNotesList, addNote };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
