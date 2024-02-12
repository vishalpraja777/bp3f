import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import SidePanel from "./SidePanel";
import CheckAdminToken from "../services/CheckAdminToken";
import SmallLoading from "../components/SmallLoading";
import MyCampaignTile from "../pages/MyCampaignTile"
import { BASE_API_URL } from "../constants/Constants";
import axios from "axios";

const CampaignControl = () => {

    CheckAdminToken();

    const [campaigns, setCampaigns] = useState();
    const [isCampaignsLoading, setIsCampaignsLoading] = useState(true);

    useEffect(() => {

        const campaignsUrl = BASE_API_URL + "campaign/getAll";

        axios.get(campaignsUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {
                console.log(response.data);
                setCampaigns(response.data);
                setIsCampaignsLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    return ( 
        <div className="adminPanel">
            <AdminNavbar />
            <div className="adminPanelContent">
                <SidePanel/>
                <div className="usersList">
                    <h2>Campaign Control</h2>
                    <div>
                        <h3>Active Campaigns</h3>
                        {isCampaignsLoading &&
                            <SmallLoading />
                        }
                        {!isCampaignsLoading &&
                            <div>
                                {(campaigns.filter(campaigns => campaigns.status === 'ACTIVE').length == 0) ? <div>
                                    <p>No campaigns</p>
                                </div>:
                                campaigns
                            .filter(campaigns => campaigns.status === 'ACTIVE')
                            .map((campaign) => (
                                <MyCampaignTile key={campaign.id} campaign={campaign} admin={true}/>
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
                                </div>:
                                campaigns
                            .filter(campaigns => campaigns.status === 'DEACTIVATED_BY_ADMIN')
                            .map((campaign) => (
                                <MyCampaignTile key={campaign.id} campaign={campaign} admin={true}/>
                                ))}
                            </div>
                        }
                    </div>

                    <div>
                        <h3>Deactived Campaigns By User</h3>
                        {isCampaignsLoading &&
                            <SmallLoading />
                        }
                        {!isCampaignsLoading &&
                            <div>
                                {(campaigns.filter(campaigns => campaigns.status === 'DEACTIVATED_BY_USER').length == 0) ? <div>
                                    <p>No campaigns</p>
                                </div>:
                                campaigns
                            .filter(campaigns => campaigns.status === 'DEACTIVATED_BY_USER')
                            .map((campaign) => (
                                <MyCampaignTile key={campaign.id} campaign={campaign} admin={true}/>
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
                                </div>:
                                campaigns
                            .filter(campaigns => campaigns.status === 'GOAL_REACHED')
                            .map((campaign) => (
                                <MyCampaignTile key={campaign.id} campaign={campaign} admin={true}/>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CampaignControl;