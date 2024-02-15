import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { Toaster, toast } from 'sonner'
import { BASE_API_URL, genderOptions } from "../constants/Constants";
import SmallLoading from "../components/SmallLoading";

const Signup = () => {

    const navigate = useNavigate();

    const [agreement, setAgreement] = useState(false);

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [panCard, setPanCard] = useState("");
    const [aadharCard, setAadharCard] = useState("");
    const [bankName, setBankName] = useState("");
    const [holderName, setHolderName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");

    const [image, setImage] = useState()
    const [profilePic, setProfilePic] = useState('')
    const [isUploaded, setIsUploaded] = useState(false)

    const [isImageUploadLoading, setIsImageUploadLoading] = useState(false)

    const errorMessage = 'Please select a vaild Image file and Less than 1Mb';

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/*"];

    const options = genderOptions;

    const handleCheck = (e) => {
        setAgreement(e.target.checked);
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        console.log(gender)

        const { isValid, errors } = validateForm();

        if (isValid) {

            const signUpUrl = BASE_API_URL + "user/signup";

            const user = {
                name,
                gender,
                mobileNumber,
                email,
                password,
                profilePic,
                panCard,
                aadharCard,
                bankName,
                holderName,
                accountNumber,
                ifscCode
            };

            try {
                const response = await axios.post(signUpUrl, user);
                console.log("Signup successful:", response.data);
                toast.success('Signup Successful, Proceed with login')
                setTimeout(() => {
                    navigate("/login", { replace: true })
                }, 2000);


            } catch (error) {
                console.error("Signup failed:", error.response.data);
                toast.error('Signup failed: ' + error.response.data.message)
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
        else if (!gender.trim() || gender.trim() == "--Gender--") {
            errors = "Gender is required";
            isValid = false;
        }
        // Validate mobile number
        else if (!mobileNumber.trim() || !mobileRegex.test(mobileNumber)) {
            errors = "Valid 10-digit mobile number is required";
            isValid = false;
        }
        // Validate email
        else if (!email.trim() || !emailRegex.test(email)) {
            errors = "Valid email is required";
            isValid = false;
        }
        // Validate password
        else if (!password.trim() || password.length < 8) {
            errors = "Password must be at least 8 characters long";
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
        else if (!holderName.trim()) {
            errors = "Account Holder Name is required";
            isValid = false;
        }
        else if (!accountNumber.trim()) {
            errors = "Account Number is required";
            isValid = false;
        }
        else if (!ifscCode.trim()) {
            errors = "IFSC Code is required";
            isValid = false;
        }
        return { isValid, errors };
    };

    const uploadImage = async (e) => {
        e.preventDefault();

        setIsImageUploadLoading(true)

        const imageUploadUrl = BASE_API_URL + 'image/uplaodImage';

        const formData = new FormData();
        formData.append("file", image);

        axios.post(imageUploadUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((response) => {
            // handle the response
            console.log(response);
            console.log(response.data.message);
            setProfilePic(response.data.message);
            setIsUploaded(true);
            setIsImageUploadLoading(false)

        })
            .catch((error) => {
                // handle errors
                console.log(error);
                setIsImageUploadLoading(false)
            });
    }

    const handleFileSubmit = (e, file) => {
        e.preventDefault();

        setIsImageUploadLoading(true)

        if (!isValidImage(file)) {
            toast.error(errorMessage);
            setIsImageUploadLoading(false)
            return;
        }

        console.log(file)
        setImage(file)
        setIsImageUploadLoading(false)

    }

    const handleUploadAnotherImage = (e) => {
        setProfilePic('');
        setIsUploaded(false);
        setImage('')
    }

    const isValidImage = (file) => {

        // Check file size

        if (!allowedTypes.includes(file?.type) || file.size > 100000) {
            return false;
        }
        return true;
    }

    return (
        <div className="signupContainer">
            <Toaster richColors />
            <div className="signUp">
                <Link to="/"><i className="fa-solid fa-x"></i></Link>
                <div className="signupHead">
                    <h1>Sign Up</h1>
                </div>
                <div className="signupBody">
                    <form action="">

                        <div className="formDetails">
                            <div className="userdetails">
                                <h2>User Deatils</h2>

                                {/* <label htmlFor="name">Name:</label><br /> */}
                                <input type="text" name="name" id="nameIp" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} /><br />

                                {/* <label htmlFor="gender">Gender:</label><br /> */}
                                {/* <input type="text" name="gender" id="genderIp" placeholder="Gender" value={gender} onChange={(e) => { setGender(e.target.value) }} /><br /> */}

                                {/* Gender Select */}
                                <select onChange={(e) => { setGender(e.target.value) }} className="selectOptions">
                                    <option>--Gender--</option>
                                    {options.map((option, index) => {
                                        return (
                                            <option value={option} key={index}>
                                                {option}
                                            </option>
                                        );
                                    })}
                                </select>

                                {/* <label htmlFor="mobileNumber">Mobile Number:</label><br /> */}
                                <input type="number" name="mobileNumber" id="mobileNumberIp" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => { setMobileNumber(e.target.value) }} /><br />

                                {/* <label htmlFor="email">Email:</label><br /> */}
                                <input type="email" name="email" id="emailIp" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />

                                {/* <label htmlFor="password">Password:</label><br /> */}
                                <input type="password" name="password" id="passwordIp" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />

                                {/* <label htmlFor="panCard">panCard:</label><br /> */}
                                <input type="text" name="panCard" id="panCardIp" placeholder="PanCard" value={panCard} onChange={(e) => { setPanCard(e.target.value) }} /><br />

                                {/* <label htmlFor="aadharCard">aadharCard:</label><br /> */}
                                <input type="number" name="aadharCard" id="aadharCardIp" placeholder="AadharCard" value={aadharCard} onChange={(e) => { setAadharCard(e.target.value) }} /><br />
                            </div>
                            <div className="bankDetails">
                                <h2>Bank Account Deatils</h2>

                                {/* <label htmlFor="bankName">bankName:</label><br /> */}
                                <input type="text" name="bankName" id="bankName" placeholder="BankName" value={bankName} onChange={(e) => { setBankName(e.target.value) }} /><br />

                                {/* <label htmlFor="holderName">Account Holder Name:</label><br /> */}
                                <input type="text" name="holderName" id="holderNameIp" placeholder="Account Holder Name" value={holderName} onChange={(e) => { setHolderName(e.target.value) }} /><br />

                                {/* <label htmlFor="accountNumber">Account Number:</label><br /> */}
                                <input type="number" name="accountNumber" id="accountNumberIp" placeholder="Account Number" value={accountNumber} onChange={(e) => { setAccountNumber(e.target.value) }} /><br />

                                {/* <label htmlFor="ifscCode">IFSC Code:</label><br /> */}
                                <input type="text" name="ifscCode" id="ifscCodeIp" placeholder="IFSC Code" value={ifscCode} onChange={(e) => { setIfscCode(e.target.value) }} /><br />


                                {/* Image Container */}
                                <div className="fileContainer" onDrop={(e) => { handleFileSubmit(e, e.dataTransfer.files[0]) }}>

                                    {isImageUploadLoading &&
                                        <div className="loadingContainer">
                                            <SmallLoading />
                                        </div>
                                    }
                                    {!isImageUploadLoading && <div>

                                        {!image && <div><p>Choose Image or Drag and Drop Here</p>
                                            <input type="file" name="image" id="imageIp" onChange={(e) => { handleFileSubmit(e, e.target.files[0]) }} />
                                        </div>
                                        }
                                        {image && !isUploaded &&
                                            <p>Image Name: {image.name}
                                                <br />
                                                <button className="greenBtn btn" onClick={(e) => { uploadImage(e) }}>Upload image</button>
                                                <button className="redBtn btn" onClick={(e) => { setImage('') }}>Remove image</button>
                                            </p>
                                        }
                                        {image && isUploaded &&
                                            <div>
                                                <p>Image Uploaded: {image.name}</p>
                                                <button className="redBtn btn" onClick={(e) => { handleUploadAnotherImage(e) }}>Upload different image</button>
                                            </div>
                                        }
                                    </div>
                                    }
                                </div>

                                <input type="checkbox" name="accept" id="acceptIp" onChange={handleCheck} />
                                <label htmlFor="acceptIp">I accept the <Link to="/privacyPolicy" target="_blank">Privacy Policy</Link></label>
                            </div>
                        </div>
                        <input type="submit" value="Sign Up" className="submitBtn btn" disabled={!agreement} onClick={(e) => { handleSignup(e) }} />
                    </form>
                </div>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <p>Copyright &copy; {new Date().getFullYear()} BP3F. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Signup;