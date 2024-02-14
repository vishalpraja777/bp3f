import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import SidePanel from "./SidePanel";
import { BASE_API_URL } from "../constants/Constants";
import axios from "axios";
import WithdrawRequestTileAdmin from "./WithdrawRequestTileAdmin";
import WithdrawApprovedTileAdmin from "./WithdrawApprovedTileAdmin";

const ApproveWithdrawals = () => {

    const [withdrawRequests, setWithdrawRequests] = useState([]);
    const [isWithdrawRequestsLoading, setIsWithdrawRequestsLoading] = useState(true);

    const [withdrawsApproved, setWithdrawsApproved] = useState([]);
    const [isWithdrawsApprovedLoading, setIsWithdrawsApprovedLoading] = useState(true);

    useEffect(() => {

        const withdrawRequestsUrl = BASE_API_URL + "withdraw/getAll"

        axios.get(withdrawRequestsUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((reponse) => {
                setWithdrawRequests(reponse.data);
                setIsWithdrawRequestsLoading(false)
                console.log(reponse.data)
            })
            .catch((error) => {
                console.log(error.reponse.data)
            })

        const withdrawsApprovedUrl = BASE_API_URL + "withdrawApproval/getAll"

        axios.get(withdrawsApprovedUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
            .then((reponse) => {
                setWithdrawsApproved(reponse.data);
                setIsWithdrawsApprovedLoading(false)
                console.log(reponse.data)
            })
            .catch((error) => {
                console.log(error.reponse.data)
            })

    }, [])

    return (
        <div className="adminPanel">
            <AdminNavbar />
            <div className="adminPanelContent">
                <SidePanel />
                <div className="usersList">
                    <h2>Withdrawal Requests</h2>
                    <div>
                        <h3>Pending Requests</h3>
                        {withdrawRequests.filter(withdrawRequests => withdrawRequests.approved == false).length == 0 ?
                            <div>No Pending Requests</div> :
                            !isWithdrawRequestsLoading && withdrawRequests
                                .filter(withdrawRequests => withdrawRequests.approved == false)
                                .map((withdrawRequest) => (
                                    <WithdrawRequestTileAdmin key={withdrawRequest.id} withdrawRequest={withdrawRequest} />
                                ))
                        }
                    </div>
                    <div>
                        <h3>Approved Requests</h3>
                        {withdrawsApproved.filter(withdrawsApproved => withdrawsApproved.approvedStatus == true).length == 0 ?
                            <div>No Requests Approved</div> :
                        !isWithdrawsApprovedLoading && withdrawsApproved
                            .filter(withdrawsApproved => withdrawsApproved.approvedStatus == true)
                            .map((withdrawApproved) => (
                                <WithdrawApprovedTileAdmin key={withdrawApproved.id} withdrawApproved={withdrawApproved} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApproveWithdrawals;