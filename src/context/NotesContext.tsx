import React, { createContext, useContext } from 'react';
import { db, Note } from '@/database/db';
import { useAuthContext } from './AuthContext';
import { useLiveQuery } from 'dexie-react-hooks';

interface INotesContext {
  notesList: Array<Note>;
  addNote: (title: string) => Promise<
    | {
        success: true;
        id: number;
      }
    | {
        success: false;
        message: string;
      }
  >;
  deleteNote: (id: string) => Promise<
    | {
        success: true;
      }
    | {
        success: false;
        message: string;
      }
  >;
  getNoteContentFromDB: (id: string) => Promise<
    | {
        success: true;
        content: string;
      }
    | {
        success: false;
        message: string;
      }
  >;
  editNoteTitle: (
    id: number,
    title: string
  ) => Promise<
    | {
        success: true;
      }
    | {
        success: false;
        message: string;
      }
  >;
  updateNoteContent: (
    id: string,
    content: string
  ) => Promise<
    | {
        success: true;
      }
    | {
        success: false;
        message: string;
      }
  >;
}

const NotesContext = createContext<INotesContext | null>(null);

export function useNotesContext() {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }

  return context;
}

interface INotesProviderProps {
  children: React.ReactNode;
}

const isOwner = (
  noteOwnerId: number | undefined,
  userId: number | null | undefined
) => {
  if (!noteOwnerId || !userId) return false;
  return noteOwnerId === userId;
};

export function NotesProvider({ children }: INotesProviderProps) {
  const auth = useAuthContext();

  const notesList = useLiveQuery(
    () => db.notes.where({ userId: auth?.userId || 0 }).toArray(),
    [auth.userId],
    []
  );

  const addNote: INotesContext['addNote'] = async title => {
    try {
      const newNote = { userId: auth.userId as number, title, content: '' };
      const newNoteId = await db.notes.add(newNote);
      return { success: true, id: newNoteId };
    } catch (error) {
      return {
        success: false,
        message: error?.message,
      };
    }
  };

  const deleteNote: INotesContext['deleteNote'] = async id => {
    try {
      const note = await db.notes.get(Number(id));
      if (isOwner(note?.userId, auth.userId)) {
        db.notes.delete(Number(id));
        return { success: true };
      } else {
        return {
          success: false,
          message:
            'Вы не являетесь владельцем этой заметки и не можете её удалить!',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error?.message,
      };
    }
  };

  const editNoteTitle: INotesContext['editNoteTitle'] = async (id, title) => {
    try {
      db.notes.update(Number(id), {
        title,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error?.message,
      };
    }
  };

  const updateNoteContent: INotesContext['updateNoteContent'] = async (
    id,
    content
  ) => {
    try {
      db.notes.update(Number(id), {
        content,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error?.message,
      };
    }
  };

  const getNoteContentFromDB: INotesContext['getNoteContentFromDB'] =
    async id => {
      try {
        const note = await db.notes.get(Number(id));
        if (isOwner(note?.userId, auth?.userId)) {
          return { success: true, content: note?.content || '' };
        } else {
          return {
            success: false,
            message: 'Отказано в доступе',
          };
        }
      } catch (error) {
        return {
          success: false,
          message: error?.message,
        };
      }
    };

  const value = {
    notesList,
    addNote,
    deleteNote,
    getNoteContentFromDB,
    editNoteTitle,
    updateNoteContent,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
