import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { Toaster, toast } from 'sonner'
import { BASE_API_URL } from "../constants/Constants";
import CheckTokenValidity from "../services/CheckTokenValidity";

import { jwtDecode } from "jwt-decode";
import Loading from "../components/Loading";

const EditProfile = () => {

    const navigate = useNavigate();


    const [user, setUser] = useState();

    const [isLoading, setIsLoading] = useState(true);

    CheckTokenValidity();

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [panCard, setPanCard] = useState("");
    const [aadharCard, setAadharCard] = useState("");
    const [bankName, setBankName] = useState("");
    const [holderName, setHolderName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");

    useEffect(() => {

        const token = localStorage.getItem('jwtToken');
        const tokenDecode = jwtDecode(token);

        axios.get(BASE_API_URL + "user/get/" + tokenDecode.sub, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setUser(response.data)

                setName(response.data.name);
                setEmail(response.data.email);
                setGender(response.data.gender);
                setMobileNumber(response.data.mobileNumber);
                setPanCard(response.data.panCard);
                setAadharCard(response.data.aadharCard);
                setBankName(response.data.bankName);
                setHolderName(response.data.holderName);
                setAccountNumber(response.data.accountNumber);
                setIfscCode(response.data.ifscCode);

                setIsLoading(false)
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault();

        const { isValid, errors } = validateForm();

        if (isValid) {

            const updateUrl = BASE_API_URL + "user/updateInfo/" + localStorage.getItem("userId");

            const user = {
                name,
                gender,
                mobileNumber,
                email,
                panCard,
                aadharCard,
                bankName,
                holderName,
                accountNumber,
                ifscCode
            };

            try {
                const response = await axios.post(updateUrl, user, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                });
                console.log("Update successful:", response.data);
                toast.success('Update Successful')

                setTimeout(() => {
                    navigate("/profilePage", { replace: true })
                }, 2000);


            } catch (error) {
                console.error("Update failed:", error.response);
                toast.error('Update failed')
            }
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
        const aadharCardRegex = /^\d{12}$/;
        const ifscRegex = /^[A-Za-z]{4}\d{7}$/;

        // Validate name
        if (!name.trim()) {
            errors = "Name is required";
            isValid = false;
        }

        else if (!panCard.trim()) {
            errors = "PanCard is required";
            isValid = false;
        }

        else if (!aadharCard.trim() || !aadharCardRegex.test(aadharCard)) {
            errors = "AadharCard is in Valid";
            isValid = false;
        }
        else if (!bankName.trim()) {
            errors = "Bank Name is required";
            isValid = false;
        }
        else if (!accountNumber.trim()) {
            errors = "Account Number is required";
            isValid = false;
        }
        else if (!panCard.trim()) {
            errors = "PanCard is required";
            isValid = false;
        }
        else if (!holderName.trim()) {
            errors = "Account Holder Name is required";
            isValid = false;
        }

        else if (!ifscCode.trim()) {
            errors = "IFSC Code is required";
            isValid = false;
        }

        // Validate email
        else if (!email.trim() || !emailRegex.test(email)) {
            errors = "Valid email is required";
            isValid = false;
        }

        // Validate mobile number
        else if (!mobileNumber.trim() || !mobileRegex.test(mobileNumber)) {
            errors = "Valid 10-digit mobile number is required";
            isValid = false;
        }

        // Validate password
        // else if (!password.trim() || password.length < 8) {
        //     errors = "Password must be at least 8 characters long";
        //     isValid = false;
        // }

        // Additional validations can be added for other fields here...

        return { isValid, errors };
    };

    return (

        <div>
            {isLoading && <Loading />}
            {!isLoading &&

                <div className="signupContainer">
                    <Toaster richColors />
                    <div className="signUp">
                        <Link to="/profilePage" replace="true"><i className="fa-solid fa-x"></i></Link>
                        <div className="signupHead">
                            <h1>Edit Profile</h1>
                        </div>
                        <div className="signupBody">
                            <form action="">

                                <div className="formDetails">
                                    <div className="userdetails">
                                        <h2>User Deatils</h2>

                                        <input type="text" name="name" id="nameIp" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} /><br />

                                        <input type="text" name="gender" id="genderIp" placeholder="Gender" value={gender} onChange={(e) => { setGender(e.target.value) }} /><br />

                                        <input type="number" name="mobileNumber" id="mobileNumberIp" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => { setMobileNumber(e.target.value) }} /><br />

                                        <input type="email" name="email" id="emailIp" placeholder="Email" value={email} /*onChange={(e) => { setEmail(e.target.value) }}*/ /><br />


                                        <input type="text" name="panCard" id="panCardIp" placeholder="PanCard" value={panCard} onChange={(e) => { setPanCard(e.target.value) }} /><br />

                                        <input type="number" name="aadharCard" id="aadharCardIp" placeholder="AadharCard" value={aadharCard} onChange={(e) => { setAadharCard(e.target.value) }} /><br />
                                    </div>
                                    <div className="bankDetails">
                                        <h2>Bank Account Deatils</h2>

                                        <input type="text" name="bankName" id="bankName" placeholder="BankName" value={bankName} onChange={(e) => { setBankName(e.target.value) }} /><br />

                                        <input type="text" name="holderName" id="holderNameIp" placeholder="Account Holder Name" value={holderName} onChange={(e) => { setHolderName(e.target.value) }} /><br />

                                        <input type="number" name="accountNumber" id="accountNumberIp" placeholder="Account Number" value={accountNumber} onChange={(e) => { setAccountNumber(e.target.value) }} /><br />

                                        <input type="text" name="ifscCode" id="ifscCodeIp" placeholder="IFSC Code" value={ifscCode} onChange={(e) => { setIfscCode(e.target.value) }} /><br />

                                    </div>
                                </div>
                                <input type="submit" value="Update" className="submitBtn btn" onClick={(e) => { handleUpdate(e) }} />
                            </form>
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default EditProfile;