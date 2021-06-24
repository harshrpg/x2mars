import * as React from "react";

const Factory = (props) => {
    return (
        <div>
            <p>Account: {props.account}</p>
            <p>Balance: {props.balance}</p>
        </div>
    )
}

export default Factory;