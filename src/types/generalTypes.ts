export enum AppRoutes {
  Main = '/',
  Notes = 'notes',
  SignIn = 'sign_in',
  SignUp = 'sign_up',
  NotFound = '*',
}

export enum Colors {
  Blue = 'rgba(38, 157, 255, 1)',
  Red = 'rgba(242, 7, 7, 1)',
  Orange = 'orange',
  Green = 'rgba(0, 184, 46, 1)',
}

export type NotesListT = Array<{ id: number; title: string }>;

export type MainOutletCotextT = {
  notes: NotesListT;
};
