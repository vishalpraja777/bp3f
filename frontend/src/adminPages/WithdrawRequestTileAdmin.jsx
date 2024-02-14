import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../constants/Constants"
import axios from "axios";
import { Toaster, toast } from "sonner";

const WithdrawRequestTileAdmin = ({ withdrawRequest }) => {

    const navigate = useNavigate();

    const getFormattedDate = (date) => {
        const dateObj = new Date(date);

        const dateStr = `${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`;
        return dateStr;
    }

    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const confirmApprove = () => {

        const approveRequestUrl = BASE_API_URL + "withdrawApproval/add"

        const withdrawRequestId = { "withdrawalRequestId": withdrawRequest.id }

        axios.post(approveRequestUrl, withdrawRequestId, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((reponse) => {
                console.log(reponse.data);
                toast.success("Withdraw Request Approved");

                setTimeout(() => {
                    window.location.reload(false);
                }, 1000);

            })
            .catch((error) => {
                console.log(error)
                toast.error("Withdraw Request Was Not Approved");
            })

        setIsConfirmationOpen(false);
    };

    const cancelApprove = () => {
        setIsConfirmationOpen(false);
    };

    return (
        <div className="withdraw">
            <Toaster richColors />
            <p><b>{withdrawRequest.withdrawAmount}</b> requested on <b>{getFormattedDate(withdrawRequest.requestDate)}</b></p>
            <div className="campaignTileBtnContainer">
                <button className="signupBtn btn" onClick={() => navigate("/viewCampaignByAdmin/" + withdrawRequest.campaignId)}>View Campaign</button>
                <button className="signupBtn btn greenBtn" onClick={(e) => setIsConfirmationOpen(true)}><i class="fa-solid fa-circle-check"></i> Approve</button>
            </div>
            {isConfirmationOpen && (
                <div className="confirmationPopup">
                    <p>Are you sure you want to approve this withdrawal request?</p>
                    <button className="signupBtn btn greenBtn" onClick={() => confirmApprove()}>Yes</button>
                    <button className="signupBtn btn redBtn" onClick={() => cancelApprove()}>No</button>
                </div>
            )}
        </div>
    );
}

export default WithdrawRequestTileAdmin;