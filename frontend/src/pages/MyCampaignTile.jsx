import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../constants/Constants";
import { TailSpin } from "react-loader-spinner";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import SmallLoading from "../components/SmallLoading";

const MyCampaignTile = (props) => {

    const [isChecked, setIsChecked] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (props.campaign.status == "ACTIVE") {
            setIsChecked(true)
        }
    }, [])

    const handleToggle = (e) => {
        e.preventDefault();
        // setIsChecked(e.target.checked)

        setIsLoading(true)
        // console.log(!isChecked);

        const status = !isChecked

        const campaign = {
            status
        }

        console.log("status", status)

        // Chnage the isChecked in backend

        const updateUrl = BASE_API_URL + "campaign/updateStatus/" + props.campaign.id

        axios.post(updateUrl, campaign, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setIsChecked(!isChecked);
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error.response.data.message)
                toast.error(error.response.data.message)

            })
        setIsLoading(false);
    }

    // const handleDeleteCampaign = (e) => {
    //     e.preventDefault();

    //     const campaignDeleteUrl = BASE_API_URL + "campaign/delete/" + props.campaign.id;

    //     try {
    //         axios.post(campaignDeleteUrl, "body", {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    //             }
    //         })
    //             .then((response) => {
    //                 toast.success("Campaign Deleted Successfully")
    //                 window.location.reload(false)
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 toast.error("Campaign Was Not Deleted")
    //             })
    //     } catch (error) {
    //         console.log(error.response);
    //         toast.error("Campaign Was Not Deleted")
    //     }

    // }

    return (
        <div>
            <Toaster richColors />
            <div className="myCamaignTile">
                <div className="tileLeft">
                    <img src={props.campaign.imageLink} alt="" />
                    <div className="tileTextContent">
                        <h4>{props.campaign.title}</h4>
                        {/* <p>{props.campaign.description}</p> */}
                    </div>
                </div>

                {isLoading &&
                    <div className="loadingSpin">
                        <SmallLoading />
                    </div>
                }
                {!isLoading &&
                    <div className="tileRight">
                        <div className="toogleSwitch" onClick={(e) => { handleToggle(e) }}>
                            <label className="switch">
                                <input type="checkbox" checked={isChecked} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <button className="signupBtn btn" onClick={(e) => { navigate("/editCampaign/" + props.campaign.id) }}>Edit</button>
                        <button className="signupBtn btn" onClick={(e) => { navigate("/viewCampaignByCreater/" + props.campaign.id) }}>View</button>
                        {/* <button className="signupBtn btn" onClick={(e) => { handleDeleteCampaign(e) }}>Delete</button> */}
                    </div>
                }
            </div>
        </div>
    );
}

export default MyCampaignTile;