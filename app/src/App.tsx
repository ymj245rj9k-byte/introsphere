import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Landing } from '@/pages/Landing';
import { ROUTES } from '@/constants';

export function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.LANDING} element={<Landing />} />
      </Route>
    </Routes>
  );
}
