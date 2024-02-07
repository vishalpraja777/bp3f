const UsersDonatedTile = (props) => {

    // console.log(props.userDonated)

    return (
        <div className="userDonatedTile">
            {props.userDonated.isAnonymous && <h4>Anonymous</h4>}
            {!props.userDonated.isAnonymous && <h4>{props.userDonated.name}</h4>}
            <h4>{props.userDonated.amount}</h4>
        </div>
    );
}

export default UsersDonatedTile;