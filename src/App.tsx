import { Toaster as Sonner } from '@/shared/ui/sonner';
import { Toaster } from '@/shared/ui/toaster';
import { TooltipProvider } from '@/shared/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './presentation/components/PrivateRoute';
import { PublicRoute } from './presentation/components/PublicRoute';
import { LoadingScreen } from './presentation/components/LoadingScreen';

const Index = lazy(() => import('./presentation/pages/Index'));
const Tasks = lazy(() => import('./presentation/pages/Tasks'));
const Profile = lazy(() => import('./presentation/pages/Profile'));
const Settings = lazy(() => import('./presentation/pages/Settings'));
const Login = lazy(() => import('./presentation/pages/Login'));
const Register = lazy(() => import('./presentation/pages/Register'));
const NotFound = lazy(() => import('./presentation/pages/NotFound'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public routes - redirect to / if already logged in */}
            <Route element={<PublicRoute />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>

            {/* Private routes - redirect to /login if not logged in */}
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<Index />} />
              <Route path='/tasks' element={<Tasks />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/settings' element={<Settings />} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
