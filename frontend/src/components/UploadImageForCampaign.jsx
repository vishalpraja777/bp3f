import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import CheckTokenValidity from "../services/CheckTokenValidity";
import { BASE_API_URL, categoryForImageOptions } from "../constants/Constants";
import SmallLoading from "./SmallLoading";
import axios from "axios";

const UploadImageForCampaign = () => {

    const { campaignId } = useParams()

    const navigate = useNavigate();

    const [imageTitle, setImageTitle] = useState('');
    const [imageDescription, setImageDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [imageCategory, setImageCategory] = useState('');

    const [image, setImage] = useState()
    const [isUploaded, setIsUploaded] = useState(false)

    const [isImageUploadLoading, setIsImageUploadLoading] = useState(false)

    const errorMessage = 'Please select a vaild Image file and Less than 1Mb';

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/*"];

    const options = categoryForImageOptions;


    // console.log(campaignId)

    const handeImageUpload = (e) => {
        e.preventDefault();


        const { isValid, errors } = validateForm();

        if (isValid) {

            const imageUploadUrl = BASE_API_URL + 'campaignImages/add'

            const campaignImage = {
                imageTitle,
                imageDescription,
                imageCategory,
                imageLink,
                campaignId
            }

            axios.post(imageUploadUrl, campaignImage, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            })
                .then((response) => {
                    console.log(response.data)
                    toast.success("Image Uplaoded Successfully")

                    setTimeout(() => {
                        navigate("/viewCampaignByCreater/" + campaignId, { replace: true })
                    }, 1000);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    toast.error('Image Uplaoded Failed');
                })

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

        // Validate name
        if (!imageTitle.trim()) {
            errors = "Image Title is required";
            isValid = false;
        }
        else if (!imageCategory.trim() || imageCategory.trim() == '--Category--') {
            errors = "Image Category is required";
            isValid = false;
        }
        else if (!imageCategory.trim()) {
            errors = "Image Category is required";
            isValid = false;
        }

        else if (!imageDescription.trim()) {
            errors = "Image Description is in Valid";
            isValid = false;
        }
        else if (!imageLink.trim()) {
            errors = "Image is required";
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

    return (
        <div>
            <div className="signupContainer">
                <Toaster richColors />
                <div className="signUp">
                    <Link to={"/viewCampaignByCreater/" + campaignId} replace={true} ><i className="fa-solid fa-x"></i></Link>
                    <div className="createCampaignHead">
                        <h2>Upload Image Campaign</h2>
                    </div>
                    <div className="createCampaignDetails">
                        <form action="">
                            <input type="text" name="title" id="titleIp" placeholder="Image Title" value={imageTitle} onChange={(e) => { setImageTitle(e.target.value) }} />
                            {/* <input type="text" name="imageCategory" id="imageCategoryIp" placeholder="Image Category" value={imageCategory} onChange={(e) => { setImageCategory(e.target.value) }} /> */}

                            {/* Category Select */}
                            <select onChange={(e) => { setImageCategory(e.target.value) }} className="selectOptions">
                                <option>--Category--</option>
                                {options.map((option, index) => {
                                    return (
                                        <option value={option} key={index}>
                                            {option}
                                        </option>
                                    );
                                })}
                            </select>

                            <textarea name="imageDescription" id="imageDescriptionIp" rows="4" placeholder="Enter the image description"
                                value={imageDescription} onChange={(e) => { setImageDescription(e.target.value) }} >
                            </textarea>

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

                            <input type="submit" value="Upload Image" className="submitBtn btn" onClick={(e) => { handeImageUpload(e) }} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadImageForCampaign;