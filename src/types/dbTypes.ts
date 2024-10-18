interface User {
  id: number;
  nickname: string;
  hashedPass: string;
  signedIn: number;
}

interface Note {
  id: number;
  userId: number;
  title: string;
  content: string;
}

export type { User, Note };
