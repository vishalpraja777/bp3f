import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PaymentSuccess = () => {

    const [paymentId, setPaymentId] = useState();
    const [refrenceId, setRefrenceId] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const { campaignId } = useParams();

    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search);

        setPaymentId(urlParam.get("razorpay_payment_link_id"))
        setPaymentStatus(urlParam.get("razorpay_payment_link_status"))
    }, [])

    return (
        <div>
            <Navbar />
            <div className="successContent">
                <p>Payment Success for {campaignId}</p>
                <Link to="/"><button className="signupBtn btn">Explore more Campaign</button></Link>
            </div>
            {/* <Footer/> */}
        </div>
    );
}

export default PaymentSuccess;