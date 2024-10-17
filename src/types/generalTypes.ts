export enum AppRoutes {
  Main = '/',
  Notes = 'notes',
  SignIn = 'sign_in',
  SignUp = 'sign_up',
  NotFound = '*',
}

export enum Colors {
  NoteNavlink = 'rgba(38, 157, 255, 1)',
  ExitBtn = 'rgba(242, 7, 7, 1)',
}

export type NotesListT = Array<{ id: number; title: string }>;

export type MainOutletCotextT = {
  notes: NotesListT;
};
