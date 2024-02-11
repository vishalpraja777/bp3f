import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './style/Navbar.css'
import './style/Signup.css'
import './style/Campaigns.css'
import './style/CampaignDetail.css'
import './style/DonatePage.css'
import './style/CreateCampaign.css'
import './style/Footer.css'
import './style/ProfilePage.css'
import './style/MyCampaign.css'
import './adminPages/AdminPanel.css'

import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
