import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'

import axios from "axios";
import { BASE_API_URL } from "../constants/Constants";

const Login = () => {

    // const history = useHistory();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginUrl = BASE_API_URL + "user/login";

        const { isValid, errors } = validateForm();

        if (isValid) {

            try {
                const response = await axios.post(loginUrl, {
                    email,
                    password,
                });

                const { token } = response.data;
                console.log(response.data)
                localStorage.setItem("jwtToken", token);

                axios.get(BASE_API_URL + "user/get/" + email, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                }).then((response) => {
                    localStorage.setItem("userId", response.data.id)
                    localStorage.setItem("profilePic", response.data.profilePic)
                })
                    .catch((error) => {
                        // handle errors
                        console.log(error);
                    });

                navigate("/", { replace: true });

            } catch (error) {
                console.error("Login failed:", error.response.data);
                toast.error('Login Failed')

            }
        }
        else {
            console.log("Validation errors:", errors);
            toast.error(errors)
        }
    }

    const validateForm = () => {
        // Validation flags
        let isValid = true;
        let errors = {};

        // Regular expressions for validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email
        if (!email.trim() || !emailRegex.test(email)) {
            errors = "Valid email is required";
            isValid = false;
        }
        // Validate password
        else if (!password.trim() || password.length < 8) {
            errors = "Password must be at least 8 characters long";
            isValid = false;
        }

        // Additional validations can be added for other fields here...

        return { isValid, errors };
    };

    return (
        <div className="signupContainer">
            <Toaster richColors />
            <div className="signUp">
                <Link to="/"><i className="fa-solid fa-x"></i></Link>
                <div className="signupHead">
                    <h1>Login</h1>
                </div>
                <div className="signupBody">
                    <form action="">
                        <div className="formDetails">
                            <div className="userdetails">
                                <input type="email" name="email" id="emailIp" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
                                <input type="password" name="password" id="passwordIp" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />

                            </div>
                        </div>
                        <input type="submit" value="Login" className="submitBtn btn" onClick={(e) => { handleLogin(e) }} />
                    </form>
                </div>
                <p>Create a new account? <Link to="/signup">Sign Up</Link></p>
                <p>Copyright &copy; {new Date().getFullYear()} BP3F. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Login;