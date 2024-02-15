import { useEffect, useState } from "react";
import { BASE_API_URL } from "../constants/Constants";
import axios from "axios";

const PrivacyPolicy = () => {

    const [value, setValue] = useState();
    const [isValueLoading, setIsValueLoading] = useState(true);

    useEffect(() => {

        const privacyPolicyUrl = BASE_API_URL + "websiteConstants/getByKey/Privacy_Policy";

        axios.get(privacyPolicyUrl)
            .then((reponse) => {
                setValue(reponse.data.valueColumn);
                setIsValueLoading(false)
            })
            .catch((error) => {
                console.log(error.reponse.data)
            })

    }, [])

    return (
        <div className="privacyPolicyPage">
            <h2>Privacy Policy</h2>
            {!isValueLoading && <p>{value}</p>}
        </div>
    );
}

export default PrivacyPolicy;