import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CheckTokenValidity from "../services/CheckTokenValidity";
import CampaignTile from "../components/CampaignTile";
import React from "react";
import { BASE_API_URL } from "../constants/Constants";
import axios from "axios";
import Loading from "../components/Loading";
import MyCampaignTile from "./MyCampaignTile";
import { useNavigate } from "react-router-dom";

const MyCampaigns = () => {

    CheckTokenValidity();

    const [campaigns, setCampaigns] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const [isCampaignsLoading, setIsCampaignsLoading] = useState(true);


    const navigate = useNavigate();

    useEffect(() => {

        const baseURL = BASE_API_URL + "campaign/getCampaignByUserId/" + localStorage.getItem("userId");

        try {
            axios.get(baseURL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            }).then((response) => {
                setCampaigns(response.data);
                setIsCampaignsLoading(false)
                console.log(response.data);
                setIsLoading(false)
            });
        } catch (error) {
            console.error("Error: ", error.response.data);

        }


    }, [])

    return (
        <div>
            {isLoading && <Loading />}
            {!isLoading &&
                <div>
                    <Navbar />
                    <div className="myCampaignsContainer">
                        <div className="rowForMyCampaignTile">
                            {/* {campaigns.map((campaign) => (
                                <MyCampaignTile key={campaign.id} campaign={campaign} admin={false} />
                            ))} */}
                            <div>
                                <h3>Active Campaigns</h3>
                                {isCampaignsLoading &&
                                    <SmallLoading />
                                }
                                {!isCampaignsLoading &&
                                    <div>
                                        {(campaigns.filter(campaigns => campaigns.status === 'ACTIVE').length == 0) ? <div>
                                            <p>No campaigns</p>
                                        </div> :
                                            campaigns
                                                .filter(campaigns => campaigns.status === 'ACTIVE')
                                                .map((campaign) => (
                                                    <MyCampaignTile key={campaign.id} campaign={campaign} admin={false} />
                                                ))}
                                    </div>
                                }
                            </div>

                            <div>
                                <h3>Deactived Campaigns By Admin</h3>
                                {isCampaignsLoading &&
                                    <SmallLoading />
                                }
                                {!isCampaignsLoading &&
                                    <div>
                                        {(campaigns.filter(campaigns => campaigns.status === 'DEACTIVATED_BY_ADMIN').length == 0) ? <div>
                                            <p>No campaigns</p>
                                        </div> :
                                            campaigns
                                                .filter(campaigns => campaigns.status === 'DEACTIVATED_BY_ADMIN')
                                                .map((campaign) => (
                                                    <MyCampaignTile key={campaign.id} campaign={campaign} admin={false} />
                                                ))}
                                    </div>
                                }
                            </div>

                            <div>
                                <h3>Deactived Campaigns By You</h3>
                                {isCampaignsLoading &&
                                    <SmallLoading />
                                }
                                {!isCampaignsLoading &&
                                    <div>
                                        {(campaigns.filter(campaigns => campaigns.status === 'DEACTIVATED_BY_USER').length == 0) ? <div>
                                            <p>No campaigns</p>
                                        </div> :
                                            campaigns
                                                .filter(campaigns => campaigns.status === 'DEACTIVATED_BY_USER')
                                                .map((campaign) => (
                                                    <MyCampaignTile key={campaign.id} campaign={campaign} admin={false} />
                                                ))}
                                    </div>
                                }
                            </div>

                            <div>
                                <h3>Goal Reached Campaigns</h3>
                                {isCampaignsLoading &&
                                    <SmallLoading />
                                }
                                {!isCampaignsLoading &&
                                    <div>
                                        {(campaigns.filter(campaigns => campaigns.status === 'GOAL_REACHED').length == 0) ? <div>
                                            <p>No campaigns</p>
                                        </div> :
                                            campaigns
                                                .filter(campaigns => campaigns.status === 'GOAL_REACHED')
                                                .map((campaign) => (
                                                    <MyCampaignTile key={campaign.id} campaign={campaign} admin={false} />
                                                ))}
                                    </div>
                                }
                            </div>
                        </div>
                        <div>
                            <button className="signupBtn btn" onClick={(e) => { navigate("/createCampaign") }}>Create New Campaign</button>
                        </div>
                    </div>
                    {/* <Footer /> */}
                </div>
            }
        </div>
    );
}

export default MyCampaigns;