import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckTokenValidity = () => {

  const navigate = new useNavigate();
  const currentDate = new Date();

  useEffect(() => {


    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.log('Token not found!');
      navigate("/");
      return;
    }

    const tokenDecode = jwtDecode(token);
    // console.log(tokenDecode.sub)
    // console.log(tokenDecode.role)

    if (tokenDecode.role == 'admin') {
      navigate("/adminHomePage");
    }

    if (tokenDecode.exp * 1000 < currentDate.getTime()) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('profilePic');
      navigate("/")
      console.log("Token Expired!")
    } else {
      // console.log("Token Active")
    }

  }, [])

};

export default CheckTokenValidity;
