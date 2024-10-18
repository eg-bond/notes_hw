import Dexie, { type EntityTable } from 'dexie';
import type { Note, User } from '@/types/dbTypes';

const db = new Dexie('NotesDB') as Dexie & {
  // primary key "id" (for the typings only)
  users: EntityTable<User, 'id'>;
  notes: EntityTable<Note, 'id'>;
};

// Schema declaration:
db.version(4).stores({
  // primary key "id" (for the runtime!)
  users: '++id, &nickname, signedIn',
  notes: '++id, userId',
});

export { db };
