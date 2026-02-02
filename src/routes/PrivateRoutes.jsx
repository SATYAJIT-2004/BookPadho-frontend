import React from 'react'
import { useAuth } from '../context/AuthContext'

const PrivateRoutes = ({children}) => {
      const user = useAuth();
      if(!user){
      return <Navigate to="/login" replace />;
      }
  return children;
}

export default PrivateRoutes