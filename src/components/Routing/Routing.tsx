import { MainLayout } from '@/pages/MainLayout';
import { NotFound } from '@/pages/NotFound';
import { SelectedNote } from '@/components/SelectedNote';
import { SignIn } from '@/pages/SignIn';
import { SignUp } from '@/pages/SignUp';
import { AppRoutes } from '@/types/generalTypes';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../PrivateRoute';
import { WelcomePage } from '@/pages/Welcome';
import { useAuthContext } from '@/context/AuthProvider';

export default function Routing() {
  const auth = useAuthContext();

  if (!auth?.authInit) {
    return null;
  }

  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<WelcomePage />} />
      <Route path={AppRoutes.SignUp} element={<SignUp />} />
      <Route path={AppRoutes.SignIn} element={<SignIn />} />
      <Route path={AppRoutes.NotFound} element={<NotFound />} />

      <Route
        path={AppRoutes.Notes}
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }>
        <Route path=':id' element={<SelectedNote />} />
      </Route>
    </Routes>
  );
}
