import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authentication token or user session
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('profilePic');

    // Redirect to the login page
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;
