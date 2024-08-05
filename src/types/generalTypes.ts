export enum AppRoutes {
  Main = '/',
  Notes = 'notes',
  SignIn = 'sign_in',
  SignUp = 'sign_up',
  NotFound = '*',
}

export type NotesListT = Array<{ id: number; title: string }>;

export type MainOutletCotextT = {
  notes: NotesListT;
};
