import { useParams, useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import CheckTokenValidity from "../services/CheckTokenValidity";
import { Toaster, toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BASE_API_URL } from "../constants/Constants";

const EditCampaign = () => {

    const { campaignId } = useParams();

    // CheckTokenValidity();

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [goalAmount, setGoalAmount] = useState('')
    const [requiredBy, setRequiredBy] = useState()

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        // Form Validation

        const { isValid, errors } = validateForm();

        if (isValid) {

            const updateCampaignUrl = BASE_API_URL + 'campaign/update/' + campaignId;

            const campaign = {
                title,
                category,
                description,
                goalAmount,
                requiredBy,
            };

            try {
                axios.post(updateCampaignUrl, campaign, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                })
                    .then((response) => {
                        console.log(response);
                        toast.success('Campaign Updated');

                        setTimeout(() => {
                            navigate("/myCampaigns", { replace: true })
                        }, 1000);

                    })
                    .catch((error) => {
                        console.log(error.response);
                        toast.error('Campaign Updation failed')

                    });
            } catch (error) {
                console.log(error.response);
                toast.error('Campaign Updation failed')
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

        // Validate name
        if (!title.trim()) {
            errors = "Title is required";
            isValid = false;
        }

        else if (!category.trim()) {
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

    const handleDateChange = (e) => {

        console.log(e.target.value);

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


    useEffect(() => {

        const token = localStorage.getItem('jwtToken');
        const tokenDecode = jwtDecode(token);

        if (!localStorage.getItem("jwtToken")) {
            navigate("/login");
        }

        axios.get(BASE_API_URL + "campaign/get/" + campaignId, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((response) => {

                console.log(response.data)

                setTitle(response.data.title)
                setDescription(response.data.description)
                setGoalAmount(response.data.goalAmount)
                setCategory(response.data.category)

                const dateObj = new Date(response.data.requiredBy);

                let month;
                let date;
                if (dateObj.getMonth() + 1 < 10) {
                    month = '0' + (dateObj.getMonth() + 1);
                } else {
                    month = dateObj.getMonth() + 1;
                }
                if (dateObj.getDate() < 10) {
                    date = '0' + dateObj.getDate();
                } else {
                    date = dateObj.getDate();
                }

                const dateString = `${dateObj.getFullYear()}-${month}-${date}`
                console.log(dateString)

                setRequiredBy(dateString)
            })
            .catch((error) => {
                console.log(error.response)
            })

    }, [])

    return (
        <div>
            {isLoading && <Loading />}
            {!isLoading &&
                <div className="signupContainer">
                    <Toaster richColors />
                    <div className="signUp">
                        <Link to={-1} replace={true} ><i className="fa-solid fa-x"></i></Link>
                        <div className="createCampaignHead">
                            <h2>Create Campaign</h2>
                        </div>
                        <div className="createCampaignDetails">
                            <form action="">
                                <input type="text" name="title" id="titleIp" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                                <input type="text" name="category" id="categoryIp" placeholder="Category" value={category} onChange={(e) => { setCategory(e.target.value) }} />
                                <textarea name="description" id="descriptionIp" rows="6" placeholder="Enter the description"
                                    value={description} onChange={(e) => { setDescription(e.target.value) }} >

                                </textarea>
                                <p>&#8377; <input type="number" name="goalAmount" id="requiredByIp" placeholder="Goal Amount in Rs." value={goalAmount} onChange={(e) => { setGoalAmount(e.target.value) }} />
                                </p>

                                <input type="date" name="requiredBy" id="requiredByIp" value={requiredBy} onChange={(e) => { handleDateChange(e) }} />
                                <input type="submit" value="Update Campaign" className="submitBtn btn" onClick={(e) => { handleUpdateSubmit(e) }} />
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default EditCampaign;