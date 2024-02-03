import axios from "axios";
import { useEffect, useState } from "react";
import CampaignTile from "../components/CampaignTile";
import { BASE_API_URL } from "../constants/Constants";

const Campaigns = () => {

    const [campaigns, setCampaigns] = useState([]);
    const [token, setToken] = useState('');


    useEffect(() => {

        setToken(localStorage.getItem("jwtToken"));

        const baseURL = BASE_API_URL + "campaign/getAll";

        try {
            axios.get(baseURL).then((response) => {
                setCampaigns(response.data);
                // console.log(response.data);
            });
        } catch (error) {
            console.error("Error: ", error.response.data);

        }


    }, [])

    return (
        <div className="campaignsContainer">
            <h1>Campaigns</h1>
            <div className="rowForCampaignTile">
                {campaigns
                    .filter(campaigns => campaigns.status === 'ACTIVE')
                    .map((campaign) => (
                        <CampaignTile key={campaign.id} campaign={campaign} />
                    ))}
            </div>
        </div>
    );
}

export default Campaigns;