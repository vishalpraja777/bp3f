import { useState, useEffect } from "react";

import { useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import { BASE_API_URL } from "../constants/Constants";
import SmallLoading from '../components/SmallLoading'
import UsersDonatedTile from "../components/UsersDonatedTile";
import CampaignImageTile from "../components/CampaignImageTile";
import SocialMediaLinks from "../components/SocialMediaLinks";

const CampaignDetail = () => {

    const { campaignId } = useParams();

    const location = useLocation();
    const navigate = useNavigate();
    // const campaignData = location.state?.campaignData || null;

    const [daysRemaining, setDaysRemaining] = useState(null);

    const [campaignData, setCampaignData] = useState(null);
    const [usersDonated, setUsersDonated] = useState(null);
    const [campaignImages, setCampaignImages] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isUsersDonatedLoading, setIsUsersDonatedLoading] = useState(true);
    const [isCampaignImagesLoading, setIsCampaignImagesLoading] = useState(true);


    const currentDate = new Date();


    // Setting date from api to React Date format
    // const backendDate = new Date(campaignData.requiredBy);
    // const currentDate = new Date();

    // const amountPending = campaignData.goalAmount - campaignData.amountRecieved;

    console.log(campaignData)


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

        // const [dateDetails, setDateDetails] = useState({
        //     year: null,
        //     month: null,
        //     day: null,
        // });

        // const backendDateString = "2024-02-13T18:30:00.000+00:00";
        // const year = backendDate.getFullYear();
        // const month = backendDate.getMonth() + 1;
        // const day = backendDate.getDate();

        // setDateDetails({
        //     year,
        //     month,
        //     day,
        // });

    }, []);

    const handleDonateClick = () => {
        // navigate(`/donatePage/${campaignData.id}`, { state: { campaignData: campaignData } })
        navigate(`/donatePage/${campaignData.id}`)
    }

    return (
        <div>
            {isLoading && <Loading />}
            {!isLoading &&
                <div className="campaignDetail">
                    <Navbar />
                    <div className="campaignContainer">
                        <h1>{campaignData.title}</h1>
                        <div className="campaignDetailBody">
                            <div className="leftContainer">
                                <img src={campaignData.imageLink} alt="Campaign Image" />
                                <p><b>Category: {campaignData.category}</b></p>
                                <p><b>Description:</b></p>
                                <p>{campaignData.description}</p>
                            </div>
                            <div className="textDetail">
                                <button className="signupBtn btn" onClick={() => handleDonateClick()}><i className="fa-solid fa-heart"></i> Donate Now</button>
                                <h1>&#8377;{campaignData.goalAmount} <span className="spanText">Goal</span> </h1>
                                <h2><span className="spanText">Raised: </span> &#8377;{campaignData.amountRecieved}<span className="spanText"> so far</span></h2>
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
                                                        <UsersDonatedTile key={userDonated.key} userDonated={userDonated} />
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
                </div>}
        </div>
    );
}

export default CampaignDetail;