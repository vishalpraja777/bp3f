import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { CreatePayment } from "../payment/Action";
import axios from "axios";
import { BASE_API_URL, commissionOptions } from "../constants/Constants";
import { Toaster, toast } from "sonner";

const DonatePage = () => {

    const { campaignId } = useParams();

    const location = useLocation();
    // const campaignData = location.state?.campaignData || null;

    const [campaignData, setCampaignData] = useState('')


    const navigate = useNavigate();

    console.log(campaignData);
    console.log(campaignId);

    // const campaignId = campaignData.id;

    const [amount, setAmount] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobilenumber] = useState('')
    const [commission, setCommission] = useState()
    const [totalAmount, setTotalAmount] = useState('')
    const [isAnonymous, setIsAnonymous] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const options = commissionOptions;

    const handleDonateSubmit = async (e) => {
        e.preventDefault();

        console.log("In action")

        const { isValid, errors } = validateForm();


        if (isValid) {

            const donate = {
                amount,
                name,
                email,
                isAnonymous,
                mobileNumber,
                campaignId,
                totalAmount
            }

            const url = `${BASE_API_URL}payment/payCampaign/${campaignId}`

            try {
                const { data } = await axios.post(url, donate);
                console.log(data.payment_status)
                console.log(data)
                if (data.payment_status == "captured" || data.payment_status == "success") {
                    console.log("Payment Success")
                }
                if (data.payment_link_url) {
                    // setIsLoading(true)
                    // window.location.href=data.payment_link_url;
                    window.open(data.payment_link_url);
                    navigate("/paymentSuccess/" + campaignId)

                }
            } catch (error) {
                console.log(error)
            }
            // setIsLoading(false)
        }
        else {
            console.log("Validation errors:", errors);
            toast.error(errors)
        }

    }

    const validateForm = () => {
        // Validation flags
        let isValid = true;
        let errors = {};

        // Regular expressions for validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^\d{10}$/;


        if (!amount.trim()) {
            errors = "Amount is required";
            isValid = false;
        }
        else if (!commission || commission == "--Commission--") {
            errors = "Please Select Commission";
            isValid = false;
        }
        // Validate name
        // else if (!name.trim()) {
        //     errors = "Name is required";
        //     isValid = false;
        // }
        // Validate email
        // else if (!email.trim() || !emailRegex.test(email)) {
        //     errors = "Valid email is required";
        //     isValid = false;
        // }

        // Validate mobile number
        // else if (!mobileNumber.trim() || !mobileRegex.test(mobileNumber)) {
        //     errors = "Valid 10-digit mobile number is required";
        //     isValid = false;
        // }

        // Additional validations can be added for other fields here...

        return { isValid, errors };
    };

    useEffect(() => {

        const baseURL = BASE_API_URL + "campaign/get/" + campaignId;

        try {
            axios.get(baseURL).then((response) => {
                setCampaignData(response.data);
                setIsLoading(false);
                console.log(response.data);

            });
        } catch (error) {
            console.error("Error: ", error.response.data);
        }

    }, []);

    const handleAmountChange = (e) => {
        e.preventDefault();
        setAmount(e.target.value)
        const res = parseInt(e.target.value) + parseInt(e.target.value) * ((parseInt(commission) + 3) / 100);
        setTotalAmount(res)
    }

    const handleCommissionChange = (e) => {
        e.preventDefault();
        setCommission(e.target.value)
        const res = parseInt(amount) + parseInt(amount) * ((parseInt(e.target.value) + 3) / 100);
        setTotalAmount(res)
    }

    const handleCheck = (e) => {
        setIsAnonymous(e.target.checked);
    }

    return (
        <div>
            {isLoading && <Loading />}
            {!isLoading && <div className="donatePage signupContainer">
                {/* <Navbar /> */}
                <div className="signUp">
                    <Toaster richColors />
                    <Link to={`/campaignDetail/${campaignId}`} replace={true}><i className="fa-solid fa-x"></i></Link>
                    <h2>Donation for {campaignData.title}</h2>
                    <div className="signupBody">

                        <form action="">
                            <input type="number" name="amount" id="amountIp" placeholder="Amount" value={amount} onChange={(e) => { handleAmountChange(e) }} />

                            <h5>Select Tip%:</h5>
                            {/* Commission Select */}
                            <p style={{ margin: "0px 20px", textAlign: "start" }}>BP3F charges NO fees. We rely on donors like you to cover for our expenses. Kindly consider a tip Thank you</p>
                            <select onChange={(e) => { handleCommissionChange(e) }} className="selectOptions">
                                <option>--Commission--</option>
                                {options.map((option, index) => {
                                    return (
                                        <option value={option} key={index}>
                                            {option}%
                                        </option>
                                    );
                                })}
                            </select>

                            <p style={{ margin: "0px 20px" }}>A 3% charge is deducted for Razor pay</p>

                            <h5>Total Amount after Tip: &#8377;{totalAmount}</h5>
                            <input type="text" name="name" id="nameIp" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                            <input type="number" name="phoneNumber" id="phoneNumberIp" placeholder="Phone Number" value={mobileNumber} onChange={(e) => { setMobilenumber(e.target.value) }} />
                            <input type="email" name="email" id="emailIp" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            {/* <input type="text" name="isisAnonymous" id="isisAnonymousIp" placeholder="isAnonymous" value={isAnonymous} onChange={(e) => { setIsAnonymous(e.target.value) }} /> */}
                            <br />
                            <input type="checkbox" name="accept" id="acceptIp" onChange={handleCheck} />
                            <label htmlFor="acceptIp">Anonymous Donation</label>
                            <br />

                            <input type="submit" value="Donate" className="submitBtn btn" onClick={(e) => { handleDonateSubmit(e) }} />
                        </form>
                    </div>

                    <p>By continuing, you agree to our <Link to="/termsOfUse">Terms of Service</Link> and <Link to="/privacyPolicy">Privacy Policy</Link></p>
                </div>
            </div>
            }
        </div>
    );
}

export default DonatePage;