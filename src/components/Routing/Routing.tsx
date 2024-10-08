import { MainLayout } from '@/pages/MainLayout';
import { NotFound } from '@/pages/NotFound';
import { SelectedNoteContainer } from '@/pages/SelectedNote/SelectedNoteContainer';
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

      <Route path={AppRoutes.Main} element={<MainLayout />} />
      <Route path={AppRoutes.Notes} element={<MainLayout />}>
        <Route path=':id' element={<SelectedNoteContainer />} />
      </Route>
    </Routes>
  );
}
