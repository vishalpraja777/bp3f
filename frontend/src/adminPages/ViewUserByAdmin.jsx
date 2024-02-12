import { Toaster, toast } from "sonner";
import Loading from "../components/Loading";
import AdminNavbar from "./AdminNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../constants/Constants";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ViewUserByAdmin = () => {

    const { userId } = useParams();

    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [isChecked, setIsChecked] = useState(false);
    const [status, setStatus] = useState();


    // CheckTokenValidity();

    const [imageUrl, setImageUrl] = useState('');

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
                if (!isChecked) {
                    setStatus("ACTIVE")
                } else {
                    setStatus("DEACTIVE")
                }
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error.response)
                toast.error(error.response.data.message)

            })
        setIsLoading(false);
    }

    useEffect(() => {

        const token = localStorage.getItem('jwtToken');
        const tokenDecode = jwtDecode(token);

        axios.get(BASE_API_URL + "user/findById/" + userId, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {
                console.log(response)
                setUser(response.data)
                response.data.profilePic ? setImageUrl(response.data.profilePic) : setImageUrl("/src/assets/profilePic.png");

                if (response.data.status == "ACTIVE") {
                    setIsChecked(true)
                }
                // setUserId(response.data.id)
                setStatus(response.data.status)

                setIsLoading(false)
            }).catch((error) => {
                console.log(error)
            })

    }, [])

    return (
        <div>
            {isLoading && <Loading />}
            {!isLoading &&
                <div className="profilePage">
                    <Toaster richColors />
                    <AdminNavbar />
                    <div className="profileContent">
                        <Link to={-1} replace={true} ><i className="fa-solid fa-arrow-left"></i></Link>
                        <div className="topSection">
                            <h1>User Profile</h1>
                            <div className="userSection">
                                <div>
                                    <img src={imageUrl} alt="" />
                                    <div className="statusContainer">
                                        <div className="toogleSwitch" onClick={(e) => { handleToggle(e) }}>
                                            <label className="switch">
                                                <input type="checkbox" checked={isChecked} />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                        <p className="statusText">Status: {status}</p>
                                    </div>
                                </div>
                                <div>
                                    <p>Name: {user.name}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Mobile Number: {user.mobileNumber}</p>
                                </div>
                                <div>
                                    <p>Gender: {user.gender}</p>
                                    <p>Pan Card: {user.panCard.toUpperCase()}</p>
                                    <p>Aadhar Card: {user.aadharCard}</p>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <h1>Bank Details</h1>
                            <div className="bankSection">
                                <div>
                                    <p>Account Holder: {user.holderName}</p>
                                    <p>Account Number: {user.accountNumber}</p>
                                </div>
                                <div>
                                    <p>Bank Name: {user.bankName.toUpperCase()}</p>
                                    <p>IFSC Code: {user.ifscCode.toUpperCase()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ViewUserByAdmin;