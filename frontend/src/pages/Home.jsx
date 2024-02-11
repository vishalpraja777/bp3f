import Navbar from "../components/Navbar";
import Campaigns from "./Campaigns";
import { useEffect } from 'react';

import CheckTokenValidity from "../services/CheckTokenValidity";
import Footer from "../components/Footer";

const Home = () => {

    const homepageUrl = "https://bp3f-bucket.s3.ap-south-1.amazonaws.com/CampaignImages/homepage.png";


    // useEffect(() => {
        CheckTokenValidity();
    // }, []);

    return (
        <div>
            <Navbar />
            <img src={homepageUrl} alt="Homepage" className="homepageImage" />
            <Campaigns />
            <Footer/>
        </div>
    );
}

export default Home;