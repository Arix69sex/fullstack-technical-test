import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { userRoutes } from './constants';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const authRoutes = ['/login', '/register'];


  if (isAuthenticated && authRoutes.includes(location.pathname)) {
    return <Navigate to="/pets" replace />;
  }

  if (!isAuthenticated && !authRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  if (user != null) {
    const userType =user.user_type
    if (isAuthenticated && !userRoutes[userType].includes(location.pathname)) {
    return <Navigate to="/pets" replace />;
  }
  }
  

  return children;
};

export default ProtectedRoute;
