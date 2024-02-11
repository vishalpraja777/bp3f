import { useNavigate } from "react-router-dom"

import ProgressBar from "@ramonak/react-progress-bar";

const CampaignTile = (props) => {

    // console.log(props)

    const navigate = useNavigate();

    const completedPercentage = (props.campaign.amountRecieved / props.campaign.goalAmount) * 100;

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
            <p><b>&#8377;{props.campaign.goalAmount}</b> Goal</p>
            <ProgressBar
                completed={completedPercentage}
                className="progressBar"
                bgColor="#25d366"
                animateOnRender="true"
                borderRadius="10px"
                height="10px"
                labelSize="0px"
                width="100%"
            />
            <p><b>&#8377;{props.campaign.amountRecieved}</b> Raised</p>
            <div className="campaignTileBtnContainer">
                <button className="signupBtn btn" onClick={(e) => { navigate(`/donatePage/${props.campaign.id}`) }}>Donate Now</button>
                <button className="signupBtn btn" onClick={(e) => { handleViewClick(e, props.campaign) }}>View Detail</button>
            </div>
            {/* Progress bar */}
        </div>
    );
}

export default CampaignTile;