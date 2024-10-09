// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface Note {
  noteId: string;
  content: string;
}

interface Users {
  id: number;
  nickname: string;
  pass: string;
}

interface UserNotes {
  id: number;
  notes: Array<Note>;
}

const db = new Dexie('NotesDatabase') as Dexie & {
  // primary key "id" (for the typings only)
  users: EntityTable<Users, 'id'>;
  userNotes: EntityTable<UserNotes, 'id'>;
};

// Schema declaration:
db.version(1).stores({
  // primary key "id" (for the runtime!)
  users: '++id, nickname, pass',
  userNotes: '++id, notes',
});

export type { Users, UserNotes };
export { db };
