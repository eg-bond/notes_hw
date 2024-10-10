// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface User {
  id: number;
  nickname: string;
  pass: string;
  signedIn: number;
}

interface Note {
  id: number;
  userId: number;
  content: string;
}

const db = new Dexie('NotesDB') as Dexie & {
  // primary key "id" (for the typings only)
  users: EntityTable<User, 'id'>;
  notes: EntityTable<Note, 'id'>;
};

// Schema declaration:
db.version(1).stores({
  // primary key "id" (for the runtime!)
  users: '++id, nickname, signedIn',
  notes: '++id, userId',
});

export type { User, Note };
export { db };
