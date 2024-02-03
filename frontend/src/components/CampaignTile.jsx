import { useNavigate } from "react-router-dom"

const CampaignTile = (props) => {

    // console.log(props)

    const navigate = useNavigate();

    const handleViewClick = (e, campaign) => {
        e.preventDefault();
        // navigate("/campaignDetail/"+campaign.id, { state: { campaignData: campaign } })
        navigate("/campaignDetail/"+campaign.id)
    }

    return ( 
        <div className="campaignTile" onClick={(e) => {handleViewClick(e,props.campaign)}}>
            <img src={props.campaign.imageLink} alt="Campaign Image"/>
            <h3>{props.campaign.title}</h3>
            <p>{props.campaign.description}</p>
            <p>Goal Amount: {props.campaign.goalAmount}</p>
            <p>Amount Collected: {props.campaign.amountRecieved}</p>
            {/* <button className="signupBtn btn" onClick={(e) => {handleViewClick(e,props.campaign)}}>View Detail</button> */}
        </div>
     );
}
 
export default CampaignTile;