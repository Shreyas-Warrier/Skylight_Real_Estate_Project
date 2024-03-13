import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/logout');
            localStorage.removeItem('userID');
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <Button
            aria-label="Logout"
            icon={<FiLogOut />}
            colorScheme="red" 
            onClick={handleLogout}
        >Logout</Button>
    );
};

export default Logout;
