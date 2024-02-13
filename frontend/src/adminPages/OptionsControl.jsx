import { useEffect, useState } from "react";
import CheckAdminToken from "../services/CheckAdminToken";
import AdminNavbar from "./AdminNavbar";
import SidePanel from "./SidePanel";
import { BASE_API_URL } from "../constants/Constants";
import axios from "axios";
import CommissionOptionsTile from "./CommissionOptionsTile";
import { Toaster, toast } from "sonner";

const OptionsControl = () => {

    CheckAdminToken();

    const [commissionOptions, setCommissionOptions] = useState();
    const [isCommissionOptionsLoading, setIsCommissionOptionsLoading] = useState(true);
    const [categoryOptions, setCategoryOptions] = useState();
    const [isCategoryOptionsLoading, setIsCategoryOptionsLoading] = useState(true);

    const [showAddPopup, setShowAddPopup] = useState(false);
    const [addOption, setAddOption] = useState();
    const [optionValue, setOptionValue] = useState();

    const handleAddOption = (e) => {
        e.preventDefault()

        if (addOption == 'commission') {

            if (parseInt(optionValue) > 100) {
                toast.error("Commission Should Be Less Than 100%")
                return
            }

            const commission = optionValue
            const commissionObj = { commission }

            const addCommissionUrl = BASE_API_URL + "commission/add";

            axios.post(addCommissionUrl, commissionObj, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            })
                .then((reponse) => {
                    console.log(reponse.data);
                    toast.success("Commission Added Successfully");

                    setTimeout(() => {
                        window.location.reload(false);
                        setOptionValue('')
                        setShowAddPopup(false)
                    }, 1000);

                })
                .catch((error) => {
                    console.log(error)
                    toast.error("Commission Was Not Added");
                })

        } else {

            const category = optionValue
            const categoryObj = { category }

            const addCategoryUrl = BASE_API_URL + "campaignCategory/add";

            axios.post(addCategoryUrl, categoryObj, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            })
                .then((reponse) => {
                    console.log(reponse.data);
                    toast.success("Category Added Successfully");

                    setTimeout(() => {
                        window.location.reload(false);
                        setOptionValue('')
                        setShowAddPopup(false)
                    }, 1000);

                })
                .catch((error) => {
                    console.log(error)
                    toast.error("Category Was Not Added");
                })

        }

    }

    useEffect(() => {

        const commissionUrl = BASE_API_URL + "commission/getAll";

        axios.get(commissionUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {
                setCommissionOptions(response.data);
                console.log(response.data);
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
            <Toaster richColors />
            <AdminNavbar />
            <div className="adminPanelContent">
                <SidePanel />
                <div className="usersList">
                    <div className="myCampaignsContainer">
                        <h2>Options Control</h2>
                        {!isCommissionOptionsLoading &&
                            <div>
                                <h3>Commissions %</h3>
                                {commissionOptions.sort((a, b) => { return a.commissionValue - b.commissionValue }).map((commission) => (
                                    <CommissionOptionsTile key={commission.id} object={commission} isCommission={true} />
                                ))}
                            </div>
                        }
                        <button className="signupBtn btn" onClick={(e) => { setShowAddPopup(true); setAddOption('commission') }}>Add New Commission %</button>
                    </div>
                    <div className="myCampaignsContainer">
                        {!isCategoryOptionsLoading &&
                            <div>
                                <h3>Campaign Category</h3>
                                {categoryOptions.map((category) => (
                                    <CommissionOptionsTile key={category.id} object={category} isCommission={false} />
                                ))}
                            </div>
                        }
                        <button className="signupBtn btn" onClick={(e) => { setShowAddPopup(true); setAddOption('category') }}>Add New Category</button>
                    </div>
                </div>
            </div>

            {showAddPopup && (
                <div className="withdrawalPopup">
                    <i className="fa-solid fa-x" onClick={() => { setShowAddPopup(false); setOptionValue('') }}></i>
                    <form onSubmit={(e) => handleAddOption(e)}>
                        <label htmlFor="withdrawAmount">Enter New Option:</label>
                        {addOption == 'commission' ?
                            <input
                                type="number"
                                id="withdrawAmount"
                                value={optionValue}
                                onChange={(e) => setOptionValue(e.target.value)}
                            /> :
                            <input
                                id="withdrawAmount"
                                value={optionValue}
                                onChange={(e) => setOptionValue(e.target.value)}
                            />
                        }
                        <button type="submit" className="signupBtn btn">Add</button>
                    </form>
                </div>
            )}

        </div>
    );
}

export default OptionsControl;