import { useEffect, useState } from "react";
import CheckAdminToken from "../services/CheckAdminToken";
import AdminNavbar from "./AdminNavbar";
import SidePanel from "./SidePanel";
import { BASE_API_URL } from "../constants/Constants";
import axios from "axios";
import CommissionOptionsTile from "./CommissionOptionsTile";

const OptionsControl = () => {

    CheckAdminToken();

    const [commissionOptions, setCommissionOptions] = useState();
    const [isCommissionOptionsLoading, setIsCommissionOptionsLoading] = useState(true);
    const [categoryOptions, setCategoryOptions] = useState();
    const [isCategoryOptionsLoading, setIsCategoryOptionsLoading] = useState(true);

    useEffect(() => {

        const commissionUrl = BASE_API_URL + "commission/getAll";

        axios.get(commissionUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {
                setCommissionOptions(response.data);
                setIsCommissionOptionsLoading(false);
            })
            .catch((error) => {
                console.log(error)
            })

        const categoryUrl = BASE_API_URL + "campaignCategory/getAll";

        axios.get(categoryUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {
                setCategoryOptions(response.data);
                setIsCategoryOptionsLoading(false);
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    return (
        <div className="adminPanel">
            <AdminNavbar />
            <div className="adminPanelContent">
                <SidePanel />
                <div className="usersList">
                    <h2>Options Control</h2>
                    <div className="myCampaignsContainer">
                        {!isCommissionOptionsLoading &&
                            <div>
                                <h3>Commissions %</h3>
                                {commissionOptions.map((commission) => (
                                    <CommissionOptionsTile key={commission.id} object={commission}  isCommission={true} />
                                ))}
                            </div>
                        }
                        <button className="signupBtn btn">Add New Commission %</button>
                    </div>
                    <div className="myCampaignsContainer">
                        {!isCategoryOptionsLoading &&
                            <div>
                                <h3>Campaign Category</h3>
                                {categoryOptions.map((category) => (
                                    <CommissionOptionsTile key={category.id} object={category}  isCommission={false} />
                                ))}
                            </div>
                        }
                        <button className="signupBtn btn">Add New Category</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OptionsControl;