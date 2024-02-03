const withdrawalRequestTile = (props) => {
    return ( 
        <div>
            <h3>Withdraw Approval Pending of: &#8377;{props.withdrawalRequest.withdrawAmount}</h3>
        </div>
     );
}
 
export default withdrawalRequestTile;