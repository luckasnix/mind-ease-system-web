import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/presentation/hooks/useAuth';
import { LoadingScreen } from '@/presentation/components/LoadingScreen';

export function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
}
