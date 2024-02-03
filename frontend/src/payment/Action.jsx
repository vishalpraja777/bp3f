import axios from "axios"
import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, UPDATE_PAYMENT_REQUEST } from "./ActionType"
import { BASE_API_URL } from "../constants/Constants"

export const CreatePayment = (reqData) => async(dispatch) => {
    dispatch({type:CREATE_PAYMENT_REQUEST})


        const url = `${BASE_API_URL}payment/payCampaign/$(reqData.campaignId)`

        try {
            const {data} = await axios.post(url,reqData);
            if(data.payment_link_url){
                window.location.href=data.payment_link_url;
            }
        } catch (error) {
            dispatch({type:CREATE_PAYMENT_FAILURE,payload:error.message})
        }
}

// export const UpdatePayment = (reqData) => async(dispatch) => {
//     dispatch({type:UPDATE_PAYMENT_REQUEST})

//         const url = `http://localhost:8080/payment/payCampaign?payment_id=$(reqData.campaignId)`

//         try {
//             const {data} = await axios.get(url);
//             if(data.payment_link_url){
//                 window.location.href=data.payment_link_url;
//             }
//         } catch (error) {
//             dispatch({type:CREATE_PAYMENT_FAILURE,payload:error.message})
//         }
// }