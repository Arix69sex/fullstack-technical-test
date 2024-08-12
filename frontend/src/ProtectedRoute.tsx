import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const authRoutes = ['/login', '/register'];

  if (isAuthenticated && authRoutes.includes(location.pathname)) {
    return <Navigate to="/pets" replace />;
  }

  if (!isAuthenticated && !authRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
