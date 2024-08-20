import React, { createContext, useContext } from 'react';
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
  deleteNote: (id: string) => void;
  getNoteContent: (id: string | undefined) => string;
  setNoteContent: (id: string, newContent: string) => void;
  updateNotesList: (updatedNotesList: Array<NotesListItemT>) => void;
}

const NotesContext = createContext<INotesContext>({} as INotesContext);

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

  // add note function
  function addNote(title: string) {
    const updatedNotesList = [...notesList, { id: idCounter + 1, title }];
    const nextNoteId = idCounter + 1;

    setIdCounter(nextNoteId);
    setNotesList(updatedNotesList);
    setNoteContent(nextNoteId.toString(), '');
  }

  function deleteNote(id: string) {
    const updatedNotesList = notesList.filter(
      note => note.id.toString() !== id
    );
    console.log(updatedNotesList);

    setNotesList(updatedNotesList);
    localStorage.removeItem(`note_${id}`);
  }

  function getNoteContent(id: string | undefined) {
    if (!id) return '';
    return localStorage.getItem(`note_${id}`) || '';
  }

  function setNoteContent(id: string, newContent: string) {
    localStorage.setItem(`note_${id}`, newContent);
  }

  // Update notesList in localStorage
  function updateNotesList(updatedNotesList: NotesListItemT[]) {
    setNotesList(updatedNotesList);
  }

  const value = {
    notesList,
    updateNotesList,
    addNote,
    deleteNote,
    getNoteContent,
    setNoteContent,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
