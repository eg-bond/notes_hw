import { Note } from './dbTypes';

type Success<T> = {
  success: true;
} & T;

type Error = {
  success: false;
  message: string;
};

type Result<T = void> = Success<T> | Error;

export interface INotesContext {
  notesList: Array<Note>;
  addNote: (title: string) => Promise<Result<{ id: number }>>;
  deleteNote: (id: string) => Promise<Result>;
  getNoteContentFromDB: (id: string) => Promise<Result<{ content: string }>>;
  editNoteTitle: (id: number, title: string) => Promise<Result>;
  updateNoteContent: (id: string, content: string) => Promise<Result>;
}

export interface IAuthContext {
  user: string | null;
  userId: number | null;
  authInit: boolean;
  signIn: (nickname: string, pass: string) => Promise<Result>;
  signOut: (callback: () => void) => Promise<Result>;
  signUp: (nickname: string, pass: string) => Promise<Result>;
}

export interface ProviderProps {
  children: React.ReactNode;
}
