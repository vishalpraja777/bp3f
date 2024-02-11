import CheckAdminToken from "../services/CheckAdminToken";
import AdminNavbar from "./AdminNavbar";
import SidePanel from "./SidePanel";

const OptionsControl = () => {

    CheckAdminToken();

    return ( 
        <div className="adminPanel">
            <AdminNavbar />
            <div className="adminPanelContent">
                <SidePanel/>
                Options
            </div>
        </div>
     );
}
 
export default OptionsControl;