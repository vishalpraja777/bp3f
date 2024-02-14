import { BASE_API_URL } from "../constants/Constants";
import axios from "axios";
import { Toaster, toast } from "sonner";

const CommissionOptionsTile = (props) => {

    const handleDelete = () => {

        if (props.isCommission) {

            const deleteCommissionUrl = BASE_API_URL + "commission/delete/" + props.object.id;

            axios.post(deleteCommissionUrl, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            })
                .then((reponse) => {
                    console.log(reponse.data);
                    toast.success("Commission Deleted Successfully");

                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000);

                })
                .catch((error) => {
                    console.log(error)
                    toast.error("Commission Was Deleted");
                })

        } else {
            console.log("Category")

            const deleteCategoryUrl = BASE_API_URL + "campaignCategory/delete/" + props.object.id;

            axios.post(deleteCategoryUrl, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            })
                .then((reponse) => {
                    console.log(reponse.data);
                    toast.success("Category Deleted Successfully");

                    setTimeout(() => {
                        window.location.reload(false);
                    }, 1000);

                })
                .catch((error) => {
                    console.log(error.reponse.data)
                    toast.error("Category Was Deleted");
                })
        }

    }

    return (
        <div>
            <Toaster richColors />
            <div className="commissionOptionsTile">
                {props.isCommission && <div className="tileLeft">
                    {props.object.commissionValue}%
                </div>}
                {!props.isCommission && <div className="tileLeft">
                    {props.object.category}
                </div>}
                <div className="tileRight">
                    <i className="fa-solid fa-trash-can" style={{ color: "#ff0000" }} onClick={(e) => { handleDelete(e) }}></i>
                </div>
            </div>
        </div>
    );
}

export default CommissionOptionsTile;