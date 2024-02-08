const WithdrawalApprovedTile = (props) => {

    const withdrawalApproved = props.withdrawalApproved;

    const dateObj = new Date(withdrawalApproved.approvedDate);

    const dateStr = `${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`;


    return (
        <div>
            {/* <table>
                <tr>
                    <td>{withdrawalApproved.withdrawAmount}</td>
                    <td>{dateStr}</td>
                </tr>
            </table> */}
            <h4>&#8377;{withdrawalApproved.withdrawAmount} approved on {dateStr}</h4>
        </div>
    );
}

export default WithdrawalApprovedTile;