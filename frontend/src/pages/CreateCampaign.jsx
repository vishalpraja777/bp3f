import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner'
import axios from 'axios'

import CheckTokenValidity from "../services/CheckTokenValidity";
import { BASE_API_URL, categoryOptions } from "../constants/Constants";
import SmallLoading from "../components/SmallLoading";

const CreateCampaign = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [goalAmount, setGoalAmount] = useState('')
    const [requiredBy, setRequiredBy] = useState('')

    const [image, setImage] = useState()
    const [imageLink, setImageLink] = useState('')
    const [isUploaded, setIsUploaded] = useState(false)

    const [isImageUploadLoading, setIsImageUploadLoading] = useState(false)

    const errorMessage = 'Please select a vaild Image file and Less than 1Mb';

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/*"];

    const [options, setOptions] = useState([]);

    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        // Form Validation

        const { isValid, errors } = validateForm();

        if (isValid) {

            const createCampaignUrl = BASE_API_URL + 'campaign/add';

            const campaign = {
                title,
                category,
                description,
                goalAmount,
                requiredBy,
                imageLink
            };

            try {
                axios.post(createCampaignUrl, campaign, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                })
                    .then((response) => {
                        console.log(response);
                        toast.success('Campaign Created');

                        setTimeout(() => {
                            navigate("/", { replace: true })
                        }, 1000);

                    })
                    .catch((error) => {
                        console.log(error.response);
                        toast.error('Campaign Creation failed')

                    });
            } catch (error) {
                console.log(error.response);
                toast.error('Campaign Creation failed')
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

        // Regular expressions for validation=

        // Validate name
        if (!title.trim()) {
            errors = "Title is required";
            isValid = false;
        }
        else if (!category.trim() || category.trim() == '--Category--') {
            errors = "Category is required";
            isValid = false;
        }
        else if (!description.trim()) {
            errors = "Description is required";
            isValid = false;
        }
        else if (!goalAmount.trim()) {
            errors = "Goal Amount is required";
            isValid = false;
        }
        else if (!requiredBy.trim()) {
            errors = "Required By Date is required";
            isValid = false;
        }

        // Additional validations can be added for other fields here...

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
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        }).then((response) => {
            // handle the response
            console.log(response);
            console.log(response.data.message);
            setImageLink(response.data.message);
            setIsUploaded(true);
            setIsImageUploadLoading(false)
        })
            .catch((error) => {
                // handle errors
                console.log(error);
                setIsImageUploadLoading(false)
            });

    }

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            console.log('Selected date is greater than today.');
        } else {
            console.log('Selected date is not greater than today.');
            toast.error("Select a date in the Future")
            return;
        }

        setRequiredBy(e.target.value);
    };

    // const handleFileDrop = (e) => {
    //     e.preventDefault();
    //     if (!isValidImage(e.dataTransfer.files[0])) {
    //         toast.error(errorMessage);
    //         return;
    //     }
    //     console.log(e.dataTransfer.files[0])
    //     setImage(e.dataTransfer.files[0])
    // }

    const handleFileSubmit = (e, file) => {
        e.preventDefault();

        setIsImageUploadLoading(true)

        if (!isValidImage(file)) {
            toast.error(errorMessage);
            setIsImageUploadLoading(false);
            return;
        }

        console.log(file)
        setImage(file)
        setIsImageUploadLoading(false)
    }

    const handleUploadAnotherImage = (e) => {
        setImageLink('');
        setIsUploaded(false);
        setImage('')
    }

    const isValidImage = (file) => {

        // Check file size

        if (!allowedTypes.includes(file?.type) || file.size > 1000000) {
            return false;
        }
        return true;
    }

    CheckTokenValidity();

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) {
            navigate("/login");
        }

        const categoryUrl = BASE_API_URL + "campaignCategory/getAll"

        axios.get(categoryUrl).then((response) => setOptions(response.data)).catch((error) => console.log(error.response.data))

    })


    return (
        <div className="signupContainer">
            <Toaster richColors />
            <div className="signUp">
                <Link to={-1}><i className="fa-solid fa-x"></i></Link>
                <div className="createCampaignHead">
                    <h2>Create Campaign</h2>
                </div>
                <div className="createCampaignDetails">
                    <form action="">
                        <input type="text" name="title" id="titleIp" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />

                        {/* Category Select */}
                        <select onChange={(e) => { setCategory(e.target.value) }} className="selectOptions">
                            <option>--Category--</option>
                            {options.sort((a,b) => {return a.category - b.category}).map((option, index) => {
                                return (
                                    <option value={option.category} key={index}>
                                        {option.category}
                                    </option>
                                );
                            })}
                            <option>Other</option>

                        </select>

                        <textarea name="description" id="descriptionIp" rows="6" placeholder="Enter the description"
                            value={description} onChange={(e) => { setDescription(e.target.value) }} >

                        </textarea>
                        <p>&#8377; <input type="number" name="goalAmount" id="requiredByIp" placeholder="Goal Amount in Rs." value={goalAmount} onChange={(e) => { setGoalAmount(e.target.value) }} />
                        </p>
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

                        <label>Last Date</label>
                        <input type="date" name="requiredBy" id="requiredByIp" value={requiredBy} onChange={(e) => { handleDateChange(e) }} />
                        <input type="submit" value="Create Campaign" className="submitBtn btn" onClick={(e) => { handleCreateSubmit(e) }} />
                    </form>
                    {/* <p>By continuing, you agree to our <Link to="/termsOfUse">Terms of Service</Link> and <Link to="/privacyPolicy">Privacy Policy</Link></p> */}
                </div>
            </div>
        </div>
    );
}

export default CreateCampaign;