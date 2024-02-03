import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../constants/Constants";
import { jwtDecode } from "jwt-decode";
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import CheckTokenValidity from "../services/CheckTokenValidity";
import SmallLoading from "../components/SmallLoading";
import { Toaster, toast } from "sonner";

const ProfilePage = () => {

    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [showImageUploadPopup, setShowImageUploadPopup] = useState(false);

    const [imageLink, setImageLink] = useState('');
    const [image, setImage] = useState()
    const [isUploaded, setIsUploaded] = useState(false)
    const [isImageUploadLoading, setIsImageUploadLoading] = useState(false)

    const errorMessage = 'Please select a vaild Image file and Less than 1Mb';

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/*"];

    CheckTokenValidity();

    const [imageUrl, setImageUrl] = useState('');

    const navigate = useNavigate();

    const handleUpdateProfilePic = (e) => {
        e.preventDefault()
        console.log(imageLink);

        if(imageLink == ''){
            toast.error("Upload Image");
            return;
        }

        const updateProfilePicUrl = BASE_API_URL + "user/updateProfilePic/" + localStorage.getItem("userId");

        const imageLinkBody = {
            imageLink
        }

        axios.post(updateProfilePicUrl, imageLinkBody, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
        .then((response) => {
            console.log(response.data);
            toast.success("Profile Pic Updated");
            localStorage.setItem("profilePic", imageLink)
            setShowImageUploadPopup(false);
        })
        .catch((error) => {
            console.log(error.response)
            toast.error("Profile Pic Was Not Updated")
        })

    }

    const uploadImage = async (e) => {
        e.preventDefault();

        setIsImageUploadLoading(true)

        const imageUploadUrl = BASE_API_URL + 'image/uplaodImage';
        
        const formData = new FormData();
        formData.append("file", image);
        

        axios.post(imageUploadUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        }).then((response) => {
            // handle the response
            console.log(response);
            console.log(response.data.message);
            setImageLink(response.data.message);
            setIsUploaded(true);
            setIsImageUploadLoading(false)
        })
            .catch((error) => {
                // handle errors
                console.log(error);
                setIsImageUploadLoading(false)
            });

    }


    const handleFileSubmit = (e, file) => {
        e.preventDefault();

        setIsImageUploadLoading(true)

        if (!isValidImage(file)) {
            toast.error(errorMessage);
            setIsImageUploadLoading(false)
            return;
        }

        console.log(file)
        setImage(file)
        setIsImageUploadLoading(false)
    }

    const handleUploadAnotherImage = (e) => {
        setImageLink('');
        setIsUploaded(false);
        setImage('')
    }

    const isValidImage = (file) => {

        // Check file size

        if (!allowedTypes.includes(file?.type) || file.size > 1000000) {
            return false;
        }
        return true;
    }

    useEffect(() => {

        const token = localStorage.getItem('jwtToken');
        const tokenDecode = jwtDecode(token);

        axios.get(BASE_API_URL + "user/get/" + tokenDecode.sub, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setUser(response.data)
                response.data.profilePic ? setImageUrl(response.data.profilePic) : setImageUrl("/src/assets/profilePic.png");
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
                    <Toaster richColors/>
                    <Navbar />
                    <div className="profileContent">
                        <div className="topSection">
                            <h1>My Profile</h1>
                            <div className="userSection">
                                <div>
                                    <img src={imageUrl} alt="" />
                                    <i className="fa-solid fa-edit" onClick={(e) => { setShowImageUploadPopup(true) }}></i>
                                    <p className="statusText">Status: {user.status}</p>
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
                        <div className="buttonContainer">
                            <button className="signupBtn btn" onClick={() => navigate("/editProfile")}>Edit Profile</button>
                            <button className="signupBtn btn" onClick={() => navigate("/logout")}>Logout</button>
                        </div>
                    </div>
                </div>
            }
            {
                showImageUploadPopup &&
                <div className="withdrawalPopup">
                    <i className="fa-solid fa-x" onClick={() => setShowImageUploadPopup(false)}></i>
                    <form onSubmit={(e) => handleUpdateProfilePic(e)}>
                        <label htmlFor="withdrawAmount">Upload Image:</label>
                        
                        <div className="fileContainer" onDrop={(e) => { handleFileSubmit(e, e.dataTransfer.files[0]) }}>

                                {isImageUploadLoading &&
                                    <div className="loadingContainer">
                                        <SmallLoading />
                                    </div>
                                }

                                {!isImageUploadLoading && <div>
                                    {!image && <div><p>Choose Image or Drag and Drop Here</p>
                                        <input type="file" name="image" id="imageIp" onChange={(e) => { handleFileSubmit(e, e.target.files[0]) }} />
                                    </div>
                                    }
                                    {image && !isUploaded &&
                                        <p>Image Name: {image.name}
                                            <br />
                                            <button className="greenBtn btn" onClick={(e) => { uploadImage(e) }}>Upload image</button>
                                            <button className="redBtn btn" onClick={(e) => { setImage('') }}>Remove image</button>
                                        </p>
                                    }
                                    {image && isUploaded &&
                                        <div>
                                            <p>Image Uploaded: {image.name}</p>
                                            <button className="redBtn btn" onClick={(e) => { handleUploadAnotherImage(e) }}>Upload different image</button>
                                        </div>
                                    }
                                </div>
                                }
                            </div>

                        <button type="submit" className="signupBtn btn">Update Profile Pic</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default ProfilePage;