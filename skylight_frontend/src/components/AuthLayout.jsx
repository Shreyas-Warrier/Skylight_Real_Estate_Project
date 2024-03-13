/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children }) => {
 const navigate = useNavigate();
 const userId = localStorage.getItem('userID');

 if (!userId) {
    
    navigate('/');
    return null; 
 }

 return <>{children}</>;
};

export default AuthLayout;
