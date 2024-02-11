import React from "react";

import { useNavigate } from "react-router-dom";

const SidePanel = ({ onButtonClick }) => {

  const navigate = useNavigate();

  return (
    <div className="sidePanel">
      {/* <button className="sidePanelButton" onClick={() => onButtonClick(<UsersControl users={users}/>)}><i className="fa-solid fa-user"></i> Users</button>
      <button className="sidePanelButton" onClick={() => onButtonClick(<CampaignControl campaign={users}/>)}><i className="fa-solid fa-list"></i> Campaign</button>
      <button className="sidePanelButton" onClick={() => onButtonClick(<OptionsControl options={users}/>)}><i className="fa-solid fa-table"></i> Select Options</button>
      <button className="sidePanelButton" onClick={() => onButtonClick(UpdatePrivacyPolicy)}><i className="fa-solid fa-shield-halved"></i> Privacy Policy</button>
     */}
      <button className="sidePanelButton" onClick={() => navigate("/usersControl")}><i className="fa-solid fa-user"></i> Users</button>
      <button className="sidePanelButton" onClick={() => navigate("/campaignControl")}><i className="fa-solid fa-list"></i> Campaign</button>
      <button className="sidePanelButton" onClick={() => navigate("/optionsControl")}><i className="fa-solid fa-table"></i> Select Options</button>
      <button className="sidePanelButton" onClick={() => navigate("/privacyControl")}><i className="fa-solid fa-shield-halved"></i> Privacy Policy</button>
    
      <button className="sidePanelButton" onClick={() => navigate("/logout")}><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
    
    </div>
  );
};

export default SidePanel;
