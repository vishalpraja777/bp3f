import CheckAdminToken from "../services/CheckAdminToken";
import AdminNavbar from "./AdminNavbar";
import SidePanel from "./SidePanel";

const UpdatePrivacyPolicy = () => {

    CheckAdminToken();

    return ( 
        <div className="adminPanel">
            <AdminNavbar />
            <div className="adminPanelContent">
                <SidePanel/>
                Privacy Policy
            </div>
        </div>
     );
}
 
export default UpdatePrivacyPolicy;