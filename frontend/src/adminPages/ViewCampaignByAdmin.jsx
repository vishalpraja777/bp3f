import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_API_URL } from "../constants/Constants";
import axios from "axios";
import Loading from "../components/Loading";
import { Toaster, toast } from "sonner";
import SocialMediaLinks from "../components/SocialMediaLinks";
import SmallLoading from "../components/SmallLoading";
import UsersDonatedTile from "../components/UsersDonatedTile";
import Footer from "../components/Footer";
import WithdrawalApprovedTile from "../components/WithdrawalApprovedTile";
import WithdrawalRequestTile from "../components/WithdrawalRequestTile";
import CampaignImageTile from "../components/CampaignImageTile";
import AdminNavbar from "./AdminNavbar";

const viewCampaignByAdmin = () => {

    const { campaignId } = useParams();

    const navigate = useNavigate();

    const [campaignData, setCampaignData] = useState(null);
    const [usersDonated, setUsersDonated] = useState(null);
    const [campaignImages, setCampaignImages] = useState(null);

    const [isWithdrawalsRequestLoading, setIsWithdrawalsRequestLoading] = useState(true);
    const [isWithdrawalsApprovedLoading, setIsWithdrawalsApprovedLoading] = useState(true);
    const [withdrawalsRequest, setWithdrawalsRequest] = useState()
    const [withdrawalsApproved, setWithdrawalsApproved] = useState()

    const [isLoading, setIsLoading] = useState(true);
    const [isUsersDonatedLoading, setIsUsersDonatedLoading] = useState(true);
    const [isCampaignImagesLoading, setIsCampaignImagesLoading] = useState(true);

    const [showWithdrawalPopup, setShowWithdrawalPopup] = useState(false);

    const [withdrawAmount, setWithdrawAmount] = useState(0);

    const [daysRemaining, setDaysRemaining] = useState(null);

    const [showImageUploadPopup, setShowImageUploadPopup] = useState(false);

    const [imageLink, setImageLink] = useState('');
    const [image, setImage] = useState()
    const [isUploaded, setIsUploaded] = useState(false)
    const [isImageUploadLoading, setIsImageUploadLoading] = useState(false)

    const [enlargeImageUrl, setEnlargeImageUrl] = useState('');

    const errorMessage = 'Please select a vaild Image file and Less than 1Mb';

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/*"];


    const currentDate = new Date();

    console.log(campaignId)

    const handleUpdateCampaignImage = (e) => {
        e.preventDefault()
        console.log(imageLink);

        if (imageLink == '') {
            toast.error("Upload Image");
            return;
        }

        const updateCampaignImageUrl = BASE_API_URL + "campaign/updateCampaignImage/" + campaignId;

        const imageLinkBody = {
            imageLink
        }

        axios.post(updateCampaignImageUrl, imageLinkBody, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {
                console.log(response.data);
                toast.success("Campaign Image Updated");
                setShowImageUploadPopup(false);
            })
            .catch((error) => {
                console.log(error.response)
                toast.error("Campaign Image Was Not Updated")
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

    const handleAddImages = (e) => {
        e.preventDefault();
        navigate(`/uploadImageForCampaign/${campaignData.id}`)
    }

    const handleWithdrawRequest = (e) => {
        e.preventDefault();


        const userId = localStorage.getItem("userId");

        if (withdrawalsRequest.length !== 0) {
            toast.error("Request Already Sent")
            return;
        }
        if (withdrawAmount == 0) {
            toast.error("Enter the Amount to withdraw")
            return;
        }
        if (parseInt(withdrawAmount) + campaignData.amountWithdrawn > campaignData.amountRecieved) {
            toast.error("Not Enough Balance")
            return;
        }

        const withdrawRequest = {
            withdrawAmount,
            campaignId,
            userId
        }

        console.log(withdrawRequest)

        const withdrawRequestBaseURL = BASE_API_URL + "withdraw/add";

        try {
            axios.post(withdrawRequestBaseURL, withdrawRequest, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            })
                .then((response) => {
                    console.log(response.data);
                    toast.success("Request Sent For Approval")
                    setShowWithdrawalPopup(false);

                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000);

                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Request Was Not Sent');
                });
        } catch (error) {
            console.error("Error: ", error.response);
            toast.error("Request Was Not Sent")
            setShowWithdrawalPopup(false);
        }

    }

    useEffect(() => {

        const campaignBaseURL = BASE_API_URL + "campaign/get/" + campaignId;

        try {
            axios.get(campaignBaseURL).then((response) => {
                setCampaignData(response.data);
                setIsLoading(false);
                console.log(response.data);

                const timeDifference = new Date(response.data.requiredBy).getTime() - currentDate.getTime();
                const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                setDaysRemaining(daysDifference);

                const amountPending = response.data.goalAmount - response.data.amountRecieved;

            });
        } catch (error) {
            console.error("Error: ", error.response);

        }

        const usersDonatedBaseURL = BASE_API_URL + "usersDonated/getByCampaignId/" + campaignId;

        try {
            axios.get(usersDonatedBaseURL).then((response) => {
                setUsersDonated(response.data);
                setIsUsersDonatedLoading(false);
                console.log(response.data);
            });
        } catch (error) {
            console.error("Error: ", error.response);
        }

        const campaignImagesUrl = BASE_API_URL + "campaignImages/getImageByCampaignId/" + campaignId;

        try {
            axios.get(campaignImagesUrl).then((response) => {
                setCampaignImages(response.data);
                setIsCampaignImagesLoading(false);
            });
        } catch (error) {
            console.error("Error: ", error.response);
        }

        const withdrawalsRequestUrl = BASE_API_URL + "withdraw/getByCampaignId/" + campaignId;

        try {
            axios.get(withdrawalsRequestUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            }).then((response) => {
                setWithdrawalsRequest(response.data);
                console.log(response.data);
                // if (response.data.length == 0) {
                //     console.log("Less")
                setIsWithdrawalsRequestLoading(false);
                // }
            });
        } catch (error) {
            console.error("Error: ", error.response);
        }

        const withdrawalsApprovedUrl = BASE_API_URL + "withdrawApproval/getByCampaignId/" + campaignId

        try {
            axios.get(withdrawalsApprovedUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            }).then((response) => {
                setWithdrawalsApproved(response.data);
                setIsWithdrawalsApprovedLoading(false);
                console.log(response.data);
            })
        } catch (error) {
            console.error("Error: ", error.response);
        }

    }, []);

    return (
        <div>
            {isLoading && <Loading />}
            {!isLoading &&
                <div className="profilePage">
                    <AdminNavbar />
                    <div className="campaignDetail">
                        <Toaster richColors />
                        <div className="campaignContainer">
                            <div className="backButton">
                                <Link to={-1} replace={true} ><i className="fa-solid fa-arrow-left"></i></Link>
                                <h1>{campaignData.title}</h1>
                            </div>
                            <div className="campaignDetailBody">
                                <div className="leftContainer">
                                    <img src={campaignData.imageLink} alt="Campaign Image" />
                                    <i className="fa-solid fa-edit" onClick={(e) => { setShowImageUploadPopup(true) }}> Change Image</i>

                                    <p><b>Category: {campaignData.category}</b></p>
                                    <p><b>Description:</b></p>
                                    <p>{campaignData.description}</p>
                                </div>
                                <div className="textDetail">
                                    <button className="signupBtn btn" onClick={(e) => handleAddImages(e)}><i className="fa-solid fa-plus"></i> Add Images</button>
                                    <button className="signupBtn withdrawBtn greenBtn" onClick={(e) => navigate("/viewUserByAdmin/" + campaignData.userId)}>View User</button>

                                    {!isWithdrawalsRequestLoading &&
                                        <div>
                                            {(withdrawalsRequest.length == 0) ? <div>
                                                {/* <h3>No Active Requests</h3> */}
                                            </div> :
                                                <div>
                                                    {
                                                        withdrawalsRequest.map((withdrawalRequest) => (
                                                            <WithdrawalRequestTile key={withdrawalRequest.id} withdrawalRequest={withdrawalRequest} />
                                                        ))
                                                    }
                                                    <div className="divider"></div>
                                                </div>
                                            }
                                        </div>
                                    }

                                    {!isWithdrawalsApprovedLoading &&
                                        <div>
                                            {(withdrawalsApproved.length == 0) ? <div>
                                                {/* <h3>No Active Requests</h3> */}
                                            </div> :
                                                <div>
                                                    {/* <table>
                                                    <tr>
                                                        <th>Amount</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </table> */}
                                                    <h3>Amount Withdrawn History:</h3>
                                                    {
                                                        withdrawalsApproved.map((withdrawalApproved) => (
                                                            <WithdrawalApprovedTile key={withdrawalApproved.id} withdrawalApproved={withdrawalApproved} />
                                                        ))
                                                    }
                                                    <div className="divider"></div>
                                                </div>
                                            }
                                        </div>
                                    }

                                    <h1>&#8377;{campaignData.goalAmount} <span className="spanText">Goal</span> </h1>
                                    <h2><span className="spanText">Raised: </span> &#8377;{campaignData.amountRecieved}<span className="spanText"> so far</span></h2>

                                    <h2><span className="spanText">Total Withdrawn: </span> &#8377;{campaignData.amountWithdrawn}<span className="spanText"></span></h2>


                                    {/* <h3><span className="spanText">Remaining: </span> &#8377;{amountPending}<span className="spanText"> to reach the goal</span></h3> */}
                                    <h3>{daysRemaining} <span className="spanText"> days left</span></h3>

                                    <SocialMediaLinks />

                                </div>
                            </div>
                            <div className="bottomSection">
                                <div className="campaignimages">
                                    <h3>Campaign Images</h3>
                                    <div>
                                        {
                                            isCampaignImagesLoading &&
                                            <div>
                                                <SmallLoading />
                                            </div>
                                        }
                                        {
                                            !isCampaignImagesLoading &&
                                            <div>
                                                {(campaignImages.length == 0) ?
                                                    <p>No Images</p> :
                                                    <div className="rowForCampaignImages">
                                                        {campaignImages.map((campaignImage) => (
                                                            <div onClick={() => { setEnlargeImageUrl(campaignImage.imageLink) }}>
                                                                <CampaignImageTile key={campaignImage.id} campaignImage={campaignImage} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="usersDonatedList">
                                    <h3>Users Donated</h3>
                                    <div>
                                        {
                                            isUsersDonatedLoading &&
                                            <div>
                                                <SmallLoading />
                                            </div>
                                        }
                                        {
                                            !isUsersDonatedLoading &&
                                            <div>
                                                {(usersDonated.length == 0) ?
                                                    <p>No Users Donated Yet</p> :
                                                    <div>
                                                        {usersDonated.map((userDonated) => (
                                                            <UsersDonatedTile key={userDonated.id} userDonated={userDonated} />
                                                        ))}
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                        {showWithdrawalPopup && (
                            <div className="withdrawalPopup">
                                <i className="fa-solid fa-x" onClick={() => setShowWithdrawalPopup(false)}></i>
                                <form onSubmit={(e) => handleWithdrawRequest(e)}>
                                    <label htmlFor="withdrawAmount">Enter Withdrawal Amount:</label>
                                    <input
                                        type="number"
                                        id="withdrawAmount"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                    />
                                    <button type="submit" className="signupBtn btn">Submit</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            }

            {
                showImageUploadPopup &&
                <div className="withdrawalPopup">
                    <i className="fa-solid fa-x" onClick={() => setShowImageUploadPopup(false)}></i>
                    <form onSubmit={(e) => handleUpdateCampaignImage(e)}>
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

                        <button type="submit" className="signupBtn btn">Update Campaign Image</button>
                    </form>
                </div>
            }

            {enlargeImageUrl &&
                <div className="enlargeImage">
                    <i className="fa-solid fa-x" onClick={() => { setEnlargeImageUrl('') }}></i>
                    <img src={enlargeImageUrl} alt="Image" />
                </div>
            }

        </div>
    );
}

export default viewCampaignByAdmin;