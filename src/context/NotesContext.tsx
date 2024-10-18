import { createContext, useCallback, useContext } from 'react';
import { db } from '@/database/db';
import { useAuthContext } from './AuthContext';
import { useLiveQuery } from 'dexie-react-hooks';
import { isOwner } from '@/helpers/utillityHelpers';
import type { INotesContext, ProviderProps } from '@/types/contextTypes';

const NotesContext = createContext<INotesContext | null>(null);

export function useNotesContext() {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }

  return context;
}

export function NotesProvider({ children }: ProviderProps) {
  const { userId } = useAuthContext();

  // observable live query to get notes from db
  const notesList = useLiveQuery(
    () => db.notes.where({ userId: userId || 0 }).toArray(),
    [userId],
    []
  );

  const addNote: INotesContext['addNote'] = useCallback(
    async (title: string) => {
      try {
        if (!userId) throw new Error('Пользователь не вошел в систему');
        const newNote = { userId, title, content: '' };
        const newNoteId = await db.notes.add(newNote);
        return { success: true, id: newNoteId };
      } catch (error) {
        return {
          success: false,
          message:
            error instanceof Error ? error.message : 'Неизвестная ошибка',
        };
      }
    },
    [userId]
  );

  const deleteNote: INotesContext['deleteNote'] = useCallback(
    async (id: string) => {
      try {
        const note = await db.notes.get(Number(id));
        if (!note) throw new Error('Заметка с таким id не найдена');
        if (!isOwner(note.userId, userId)) {
          throw new Error(
            'Вы не являетесь владельцем этой заметки и не можете её удалить!'
          );
        }
        await db.notes.delete(Number(id));
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message:
            error instanceof Error ? error.message : 'Неизвестная ошибка',
        };
      }
    },
    [userId]
  );

  const editNoteTitle: INotesContext['editNoteTitle'] = useCallback(
    async (id, title) => {
      try {
        await db.notes.update(id, { title });
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message:
            error instanceof Error ? error.message : 'Неизвестная ошибка',
        };
      }
    },
    []
  );

  const updateNoteContent: INotesContext['updateNoteContent'] = useCallback(
    async (id, content) => {
      try {
        await db.notes.update(Number(id), { content });
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message:
            error instanceof Error ? error.message : 'Неизвестная ошибка',
        };
      }
    },
    []
  );

  const getNoteContentFromDB: INotesContext['getNoteContentFromDB'] =
    useCallback(
      async (id: string) => {
        try {
          const note = await db.notes.get(Number(id));
          if (!note) throw new Error('Заметка с таким id не найдена');
          if (!isOwner(note.userId, userId)) {
            throw new Error('Отказано в доступе!');
          }
          return { success: true, content: note.content };
        } catch (error) {
          return {
            success: false,
            message:
              error instanceof Error ? error.message : 'Неизвестная ошибка',
          };
        }
      },
      [userId]
    );

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
