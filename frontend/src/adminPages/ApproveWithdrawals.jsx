import AdminNavbar from "./AdminNavbar";
import SidePanel from "./SidePanel";

const ApproveWithdrawals = () => {
    return (
        <div className="adminPanel">
            <AdminNavbar />
            <div className="adminPanelContent">
                <SidePanel />
                <div>Approve Withdrawals</div>
            </div>
        </div>
    );
}

export default ApproveWithdrawals;