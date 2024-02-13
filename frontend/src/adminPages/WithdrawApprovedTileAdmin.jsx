import { useNavigate } from "react-router-dom";

const WithdrawApprovedTileAdmin = ({ withdrawApproved }) => {

    const navigate = useNavigate();

    const getFormattedDate = (date) => {
        const dateObj = new Date(date);

        const dateStr = `${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`;
        return dateStr;
    }

    return (
        <div className="withdraw">
            <p><b>{withdrawApproved.withdrawAmount}</b> approved on <b>{getFormattedDate(withdrawApproved.approvedDate)}</b></p>
            <div className="campaignTileBtnContainer">
                <button className="signupBtn btn" onClick={() => navigate("/viewCampaignByAdmin/" + withdrawApproved.campaignId)}>View Campaign</button>
            </div>
        </div>
    );
}

export default WithdrawApprovedTileAdmin;