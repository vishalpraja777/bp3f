import { useEffect, useState } from "react";
import axios from "axios";
import CheckAdminToken from "../services/CheckAdminToken";
import AdminNavbar from "./AdminNavbar";
import SidePanel from "./SidePanel";
import { BASE_API_URL } from "../constants/Constants"
import { Toaster, toast } from "sonner";

const UpdatePrivacyPolicy = () => {

    CheckAdminToken();

    const [privacyObj, setPrivacyObj] = useState();
    const [value, setValue] = useState();
    const [isValueLoading, setIsValueLoading] = useState(true);

    const UpdatePrivacyPolicy = (e) => {
        e.preventDefault();

        const updatePrivacyPolicyUrl = BASE_API_URL + "websiteConstants/update/" + privacyObj.id;

        const valueObj = { value }

        axios.post(updatePrivacyPolicyUrl, valueObj, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((reponse) => {
                console.log(reponse.data);
                toast.success("Privacy Policy Updated Successfully");
            })
            .catch((error) => {
                console.log(error.reponse.data)
                toast.error("Privacy Policy Was Not Updated");
            })

    }

    useEffect(() => {

        const privacyPolicyUrl = BASE_API_URL + "websiteConstants/getByKey/Privacy_Policy";

        axios.get(privacyPolicyUrl)
            .then((reponse) => {
                setPrivacyObj(reponse.data);
                setValue(reponse.data.valueColumn);
                setIsValueLoading(false)
            })
            .catch((error) => {
                console.log(error.reponse.data)
            })

    }, [])

    return (
        <div className="adminPanel">
            <Toaster richColors />
            <AdminNavbar />
            <div className="adminPanelContent">
                <SidePanel />
                <div className="privacyControl">
                    <h2>Privacy Policy</h2>
                    {!isValueLoading && <div>
                        <form action="">
                            <textarea name="description" id="descriptionIp" placeholder="Enter the description"
                                value={value} onChange={(e) => { setValue(e.target.value) }} >
                            </textarea>
                        </form>
                        <button className="signupBtn btn" onClick={(e) => UpdatePrivacyPolicy(e)}>Update</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default UpdatePrivacyPolicy;