import { useNavigate } from "react-router-dom"

const CampaignTile = (props) => {

    // console.log(props)

    const navigate = useNavigate();

    const handleViewClick = (e, campaign) => {
        e.preventDefault();
        // navigate("/campaignDetail/"+campaign.id, { state: { campaignData: campaign } })
        navigate("/campaignDetail/" + campaign.id)
    }

    return (
        <div className="campaignTile" /*onClick={(e) => { handleViewClick(e, props.campaign) }}*/>
            <img src={props.campaign.imageLink} alt="Campaign Image" />
            <h3>{props.campaign.title}</h3>
            <p>{props.campaign.description.substring(0, 75)}...</p>
            <p><b>Goal Amount: {props.campaign.goalAmount}</b></p>
            <p><b>Amount Collected: {props.campaign.amountRecieved}</b></p>
            <div className="campaignTileBtnContainer">
                {/* <button className="signupBtn btn" onClick={(e) => { handleViewClick(e, props.campaign) }}>Share</button> */}
                <button className="signupBtn btn" onClick={(e) => { handleViewClick(e, props.campaign) }}>View Detail</button>
            </div>
            {/* Progress bar */}
        </div>
    );
}

export default CampaignTile;