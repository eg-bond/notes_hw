import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '@mantine/hooks';

type NoteContentT = {
  markDown: string;
  full: string;
};

type NotesT = {
  [id: number]: NoteContentT;
};

type randomUUID_T = ReturnType<typeof crypto.randomUUID>;

type NotesListItemT = {
  id: randomUUID_T;
  title: string;
};

interface INotesContext {
  notesList: Array<NotesListItemT>;
  addNote: (id: randomUUID_T, title: string) => void;
  deleteNote: (id: string) => void;
  getNoteContentFromDB: (id: string | undefined) => string;
  updateNoteContentInDB: (id: string, newContent: string) => void;
  updateNotesListInDB: (updatedNotesList: Array<NotesListItemT>) => void;
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
  const [notesList, setNotesList] = useLocalStorage<NotesListItemT[]>({
    key: LocalStorageKeys.NotesList,
    defaultValue: [],
  });

  function addNote(id: randomUUID_T, title: string) {
    const updatedNotesList = [...notesList, { id, title }];

    setNotesList(updatedNotesList);
    updateNoteContentInDB(id, '');
  }

  function deleteNote(id: string) {
    const updatedNotesList = notesList.filter(
      note => note.id.toString() !== id
    );

    setNotesList(updatedNotesList);
    localStorage.removeItem(`note_${id}`);
  }

  function getNoteContentFromDB(id: string | undefined) {
    if (!id) return '';
    return localStorage.getItem(`note_${id}`) || '';
  }

  function updateNoteContentInDB(id: string, newContent: string) {
    localStorage.setItem(`note_${id}`, newContent);
  }

  function updateNotesListInDB(updatedNotesList: NotesListItemT[]) {
    setNotesList(updatedNotesList);
  }

  const value = {
    notesList,
    updateNotesListInDB,
    addNote,
    deleteNote,
    getNoteContentFromDB,
    updateNoteContentInDB,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
