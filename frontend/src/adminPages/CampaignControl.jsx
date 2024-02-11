import React from "react";
import AdminNavbar from "./AdminNavbar";
import SidePanel from "./SidePanel";
import CheckAdminToken from "../services/CheckAdminToken";

const CampaignControl = () => {

    CheckAdminToken();

    return ( 
        <div className="adminPanel">
            <AdminNavbar />
            <div className="adminPanelContent">
                <SidePanel/>
                Campaign
            </div>
        </div>
     );
}
 
export default CampaignControl;