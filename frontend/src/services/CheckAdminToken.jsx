import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const CheckAdminToken = () => {

    const navigate = new useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.log('Token not found!');
            navigate("/");
            return;
        }

        const tokenDecode = jwtDecode(token);
        if (tokenDecode.role != 'admin') {
            navigate("/")
            return;
        }

    }, [])

}
 
export default CheckAdminToken;