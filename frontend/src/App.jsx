import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import ViewCampaignByCreater from './pages/ViewCampaignByCreater';
import MyCampaigns from './pages/MyCampaigns'
import DonatePage from './pages/DonatePage';
import Logout from './components/Logout';
import CreateCampaign from './pages/CreateCampaign';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import Loading from './components/Loading';
import PaymentSuccess from './pages/PaymentSuccess';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfile';
import EditCampaign from './pages/EditCampaign';
import UploadImageForCampaign from './components/UploadImageForCampaign';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/logout" element = {<Logout/>}/>
        <Route path="/campaigns" element = {<Campaigns/>}/>
        <Route path="/createCampaign" element = {<CreateCampaign/>}/>
        <Route path="/campaignDetail/:campaignId" element = {<CampaignDetail/>}/>
        <Route path="/viewCampaignByCreater/:campaignId" element = {<ViewCampaignByCreater/>}/>
        <Route path="/myCampaigns" element = {<MyCampaigns/>}/>
        <Route path="/donatePage/:campaignId" element = {<DonatePage/>}/>
        <Route path="/uploadImageForCampaign/:campaignId" element = {<UploadImageForCampaign/>}/>
        <Route path="/termsOfUse" element = {<TermsOfUse/>}/>
        <Route path="/privacyPolicy" element = {<PrivacyPolicy/>}/>
        <Route path="/loading" element = {<Loading/>}/>
        <Route path="/profilePage" element = {<ProfilePage/>}/>
        <Route path="/editProfile" element = {<EditProfile/>}/>
        <Route path="/editCampaign/:campaignId" element = {<EditCampaign/>}/>
        <Route path="/paymentSuccess/:campaignId" element = {<PaymentSuccess/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
