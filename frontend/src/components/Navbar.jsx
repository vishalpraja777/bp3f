import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const [token, setToken] = useState('');

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem("jwtToken"));
        const defaultImageUrl = "https://bp3f-bucket.s3.ap-south-1.amazonaws.com/CampaignImages/profilePic.png";
        localStorage.getItem("profilePic")?setImageUrl(localStorage.getItem("profilePic")):setImageUrl(defaultImageUrl);
    })

    return (
        <div>
            <header className="navbarHeader">
                <div className="navbarMain">
                    <div className="navbarLeft">
                        <h1 onClick={() => navigate("/")}>BP3F</h1>
                    </div>
                    <div className="navbarRight">
                        <button className="createCampaignBtn btn" onClick={() => navigate("/")}>Explore Campaign</button>
                        <button className="createCampaignBtn btn" onClick={() => navigate("/createCampaign")}>Create Campaign</button>
                        {token ?
                            <div className="afterAuthSection">
                                <button className="signupBtn btn" onClick={() => navigate("/myCampaigns")}>My Campaigns</button>
                                {/* <button className="signupBtn btn" onClick={() => navigate("/logout")}>Logout</button> */}
                                <div className="profilePic" onClick={() => {navigate("/profilePage")}}>
                                    <img src={imageUrl} alt="Profile Pic" />
                                </div>
                            </div> :
                            <div className="authBtnSection">
                                <button className="signupBtn btn" onClick={() => navigate("/signup")}>Sign Up</button>
                                <button className="loginBtn btn" onClick={() => navigate("/login")}>Login</button>
                            </div>
                        }
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Navbar;