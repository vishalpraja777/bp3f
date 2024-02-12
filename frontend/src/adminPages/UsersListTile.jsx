import { Toaster, toast } from "sonner";
import SmallLoading from "../components/SmallLoading";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../constants/Constants";
import { useNavigate } from "react-router-dom";

const UsersListTile = ({ user }) => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (user.status == "ACTIVE") {
            setIsChecked(true)
        }
        setUserId(user.id)
    }, [])

    const handleToggle = (e) => {
        e.preventDefault();

        setIsLoading(true)
        console.log(!isChecked);

        const status = !isChecked

        const user = {
            status
        }

        console.log("status", status)

        // Chnage the isChecked in backend
        console.log(user.id);

        const updateUserStatusUrl = BASE_API_URL + "user/updateStatus/" + userId;

        axios.post(updateUserStatusUrl, user, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setIsChecked(!isChecked);
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error.response)
                toast.error(error.response.data.message)

            })
        setIsLoading(false);
    }

    return (
        <div>
            <Toaster richColors />
            <div className="myCamaignTile">
                <div className="tileLeft">
                    <img src={user.profilePic} alt="Profile Pic" className="profilePic" />
                    <div className="tileTextContent">
                        <h4>{user.name}</h4>
                        {/* <p>{props.campaign.description}</p> */}
                    </div>
                </div>

                {isLoading &&
                    <div className="loadingSpin">
                        <SmallLoading />
                    </div>
                }
                {!isLoading &&
                    <div className="tileRight">
                        <div className="toogleSwitch" onClick={(e) => { handleToggle(e) }}>
                            <label className="switch">
                                <input type="checkbox" checked={isChecked} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <button className="signupBtn btn" onClick={(e) => { navigate("/viewUserByAdmin/" + userId) }}>View</button>
                        {/* <button className="signupBtn btn" onClick={(e) => { handleDeleteCampaign(e) }}>Delete</button> */}
                    </div>
                }
            </div>
        </div>
    );
}

export default UsersListTile;