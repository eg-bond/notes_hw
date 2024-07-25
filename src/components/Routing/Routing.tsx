import { Notes } from '@/pages/Notes';
import { SelectedNote } from '@/pages/SelectedNote';
import { AppRoutes } from '@/types/generalTypes';
import { Route, Routes } from 'react-router-dom';

export default function Routing() {
  return (
    <Routes>
      <Route path={AppRoutes.SignUp} element={<div>Sign Up</div>} />
      <Route path={AppRoutes.SignIn} element={<div>Sign In</div>} />
      <Route path={AppRoutes.NotFound} element={<div>404</div>} />

      <Route path={AppRoutes.Notes} element={<Notes />}>
        <Route path=':id' element={<SelectedNote />} />
      </Route>
    </Routes>
  );
}
