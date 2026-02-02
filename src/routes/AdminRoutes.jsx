import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminRoutes = ({children}) => {
   const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace/>;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
}

export default AdminRoutes