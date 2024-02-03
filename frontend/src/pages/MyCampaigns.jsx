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
                            {campaigns.map((campaign) => (
                                <MyCampaignTile key={campaign.id} campaign={campaign} />
                            ))}
                        </div>
                        <div>
                            <button className="signupBtn btn" onClick={(e) => {navigate("/createCampaign")}}>Create New Campaign</button>
                        </div>
                    </div>
                    {/* <Footer /> */}
                </div>
            }
        </div>
    );
}

export default MyCampaigns;