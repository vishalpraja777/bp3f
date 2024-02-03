import axios from "axios";
import { BASE_API_URL } from "../constants/Constants";
import { Toaster,toast } from "sonner";

const CampaignImageTile = (props) => {

    const handleDelete = (e) => {
            e.preventDefault();

        const campaignImageDeleteUrl = BASE_API_URL + "campaignImages/delete/" + props.campaignImage.id;

        try {
            axios.post(campaignImageDeleteUrl, "body", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            })
                .then((response) => {
                    toast.success("Campaign Image Deleted Successfully")
                    window.location.reload(false)
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Campaign Image Was Not Deleted")
                })
        } catch (error) {
            console.log(error);
            toast.error("Campaign Image Was Not Deleted")
        }
    }

    return (
        <div>
            <Toaster richColors/>
            <div className="campaignImageTile">
                <img src={props.campaignImage.imageLink} alt="Campaign Image" />
                <button className="signupBtn btn delteImgBtn" onClick={(e) => {handleDelete(e)}}><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>
    );
}

export default CampaignImageTile;