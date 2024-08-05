import { ListNotes } from '@/pages/ListNotes';
import { NotFound } from '@/pages/NotFound';
import { SelectedNote } from '@/pages/SelectedNote';
import { SignIn } from '@/pages/SignIn';
import { SignUp } from '@/pages/SignUp';
import { AppRoutes } from '@/types/generalTypes';
import { Route, Routes } from 'react-router-dom';

export default function Routing() {
  return (
    <Routes>
      <Route path={AppRoutes.SignUp} element={<SignUp />} />
      <Route path={AppRoutes.SignIn} element={<SignIn />} />
      <Route path={AppRoutes.NotFound} element={<NotFound />} />

      <Route path={AppRoutes.Main} element={<ListNotes />} />
      <Route path={AppRoutes.Notes} element={<ListNotes />}>
        <Route path=':id' element={<SelectedNote />} />
      </Route>
    </Routes>
  );
}
