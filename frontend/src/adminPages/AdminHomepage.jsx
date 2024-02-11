import { useState } from "react";
import UsersControl from "./UsersControl";
import CheckAdminToken from "../services/CheckAdminToken";
import CheckTokenValidity from "../services/CheckTokenValidity"


const AdminHomepage = () => {

    CheckTokenValidity();
    CheckAdminToken();

    return (
        <div className="adminPanel">
            {/* <AdminNavbar /> */}
            {/* <div className="adminPanelContent"> */}
            {/* <SidePanel onButtonClick={handleButtonClick} /> */}
            <UsersControl />
            {/* </div> */}
        </div>
    );
}

export default AdminHomepage;