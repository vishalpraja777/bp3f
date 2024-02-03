import { useNavigate, useParams } from "react-router-dom";
import CheckTokenValidity from "../services/CheckTokenValidity";
import UsersDonatedTile from "../components/UsersDonatedTile";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { BASE_API_URL } from "../constants/Constants";
import axios from "axios";
import SmallLoading from "../components/SmallLoading";
import CampaignImageTile from "../components/CampaignImageTile";
import WithdrawalRequestTile from "../components/WithdrawalRequestTile";
import { Toaster, toast } from "sonner";

const viewCampaignByCreater = () => {

    const { campaignId } = useParams();

    const navigate = useNavigate();

    const [campaignData, setCampaignData] = useState(null);
    const [usersDonated, setUsersDonated] = useState(null);
    const [campaignImages, setCampaignImages] = useState(null);

    const [withdrawalsRequest, setWithdrawalsRequest] = useState()

    const [isLoading, setIsLoading] = useState(true);
    const [isUsersDonatedLoading, setIsUsersDonatedLoading] = useState(true);
    const [isCampaignImagesLoading, setIsCampaignImagesLoading] = useState(true);

    const [isWithdrawalsRequestLoading, setIsWithdrawalsRequestLoading] = useState(true);
    const [showWithdrawalPopup, setShowWithdrawalPopup] = useState(false);

    const [withdrawAmount, setWithdrawAmount] = useState(0);

    const [daysRemaining, setDaysRemaining] = useState(null);

    const [showImageUploadPopup, setShowImageUploadPopup] = useState(false);

    const [imageLink, setImageLink] = useState('');
    const [image, setImage] = useState()
    const [isUploaded, setIsUploaded] = useState(false)
    const [isImageUploadLoading, setIsImageUploadLoading] = useState(false)

    const errorMessage = 'Please select a vaild Image file and Less than 1Mb';

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/*"];


    const currentDate = new Date();

    CheckTokenValidity();

    console.log(campaignId)

    const handleUpdateCampaignImage = (e) => {
        e.preventDefault()
        console.log(imageLink);

        if(imageLink == ''){
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
        if (withdrawAmount > campaignData.amountRecieved) {
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
            console.error("Error: ", error.response.data);

        }

        const usersDonatedBaseURL = BASE_API_URL + "usersDonated/getByCampaignId/" + campaignId;

        try {
            axios.get(usersDonatedBaseURL).then((response) => {
                setUsersDonated(response.data);
                setIsUsersDonatedLoading(false);
                console.log(response.data);
            });
        } catch (error) {
            console.error("Error: ", error.response.data);
        }

        const campaignImagesUrl = BASE_API_URL + "campaignImages/getImageByCampaignId/" + campaignId;

        try {
            axios.get(campaignImagesUrl).then((response) => {
                setCampaignImages(response.data);
                setIsCampaignImagesLoading(false);
            });
        } catch (error) {
            console.error("Error: ", error.response.data);
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
            console.error("Error: ", error.response.data);
        }

    }, []);

    const shareOnSocialMedia = (platform) => {
        const url = window.location.href;
        let shareLink = "";
        switch (platform) {
            case "facebook":
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case "whatsapp":
                shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
                break;
            case "instagram":
                shareLink = `https://www.instagram.com/?url=${encodeURIComponent(url)}`;
                break;
            case "twitter":
                shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
                break;
            default:
                break;
        }
        window.open(shareLink, "_blank");
    }

    return (
        <div>
            {isLoading && <Loading />}
            {!isLoading &&
                <div className="campaignDetail">
                    <Toaster richColors />
                    <Navbar />
                    <div className="campaignContainer">
                        <h1>{campaignData.title}</h1>
                        <div className="campaignDetailBody">
                            <div className="leftContainer">
                                <img src={campaignData.imageLink} alt="Campaign Image" />
                                <i className="fa-solid fa-edit" onClick={(e) => { setShowImageUploadPopup(true) }}> Change Image</i>

                                <p>Category: {campaignData.category}</p>
                                <p>{campaignData.description}</p>
                            </div>
                            <div className="textDetail">
                                <button className="signupBtn btn" onClick={(e) => handleAddImages(e)}><i className="fa-solid fa-plus"></i> Add Images</button>
                                <button className="signupBtn withdrawBtn" onClick={(e) => setShowWithdrawalPopup(true)}>Withdraw</button>
                                {!isWithdrawalsRequestLoading &&
                                    <div>
                                        {(withdrawalsRequest.length == 0) ? <div></div> :
                                            <div>
                                                {
                                                    withdrawalsRequest.map((withdrawalRequest) => (
                                                        <WithdrawalRequestTile key={withdrawalRequest.id} withdrawalRequest={withdrawalRequest} />
                                                    ))
                                                }
                                            </div>
                                        }
                                    </div>

                                }
                                <h1>&#8377;{campaignData.goalAmount} <span className="spanText">Goal</span> </h1>
                                <h2><span className="spanText">Raised: </span> &#8377;{campaignData.amountRecieved}<span className="spanText"> so far</span></h2>

                                <h2><span className="spanText">Amount Withdrawn: </span> &#8377;{campaignData.amountWithdrawn}<span className="spanText"> so far</span></h2>


                                {/* <h3><span className="spanText">Remaining: </span> &#8377;{amountPending}<span className="spanText"> to reach the goal</span></h3> */}
                                <h3>{daysRemaining} <span className="spanText"> days left</span></h3>

                                <div className="socialLinks">
                                    <h3>Share On Social Media</h3>
                                    <i className="fa-brands fa-facebook-f socialMediaBtn" onClick={() => shareOnSocialMedia("facebook")}></i>
                                    <i className="fa-brands fa-instagram socialMediaBtn" onClick={() => shareOnSocialMedia("instagram")}></i>
                                    <i className="fa-brands fa-whatsapp socialMediaBtn" onClick={() => shareOnSocialMedia("whatsapp")}></i>
                                    <i className="fa-brands fa-twitter socialMediaBtn" onClick={() => shareOnSocialMedia("twitter")}></i>
                                    {/* <button className="signupBtn btn" onClick={() => shareOnSocialMedia("facebook")}>Share on Facebook</button> */}
                                    {/* <button className="signupBtn btn" onClick={() => shareOnSocialMedia("whatsapp")}>Share on WhatsApp</button> */}
                                    {/* <button className="signupBtn btn" onClick={() => shareOnSocialMedia("instagram")}>Share on Instagram</button> */}
                                    {/* <button className="signupBtn btn" onClick={() => shareOnSocialMedia("twitter")}>Share on Twitter</button> */}
                                </div>
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
                                                        <CampaignImageTile key={campaignImage.id} campaignImage={campaignImage} />
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
                </div>}

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

        </div>
    );
}

export default viewCampaignByCreater;