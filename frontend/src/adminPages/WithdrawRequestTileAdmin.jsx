import { useNavigate } from "react-router-dom";

const WithdrawRequestTileAdmin = ({ withdrawRequest }) => {

    const navigate = useNavigate();

    const getFormattedDate = (date) => {
        const dateObj = new Date(date);

        const dateStr = `${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`;
        return dateStr;
    }

    const handleApprove = (e) =>{
        e.preventDefault()
        
    }

    return (
        <div className="withdraw">
            <p><b>{withdrawRequest.withdrawAmount}</b> requested on <b>{getFormattedDate(withdrawRequest.requestDate)}</b></p>
            <div className="campaignTileBtnContainer">
                <button className="signupBtn btn" onClick={() => navigate("/viewCampaignByAdmin/" + withdrawRequest.campaignId)}>View Campaign</button>
                <button className="signupBtn btn greenBtn" onClick={(e) => handleApprove(e)}><i class="fa-solid fa-circle-check"></i> Approve</button>
            </div>
        </div>
    );
}

export default WithdrawRequestTileAdmin;