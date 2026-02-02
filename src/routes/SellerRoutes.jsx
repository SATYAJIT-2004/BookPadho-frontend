import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const SellerRoutes = ({children}) => {
    const {user} = useAuth();
   
    if(!user){
      return <Navigate to="/login" replace />;
    }
  
if(user.role != "seller"){
    return <Navigate to="/" replace/>
}

return children

}

export default SellerRoutes