import React from 'react'

import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            if (props.ingredients[igKey] > 0){
            return (
                <li key={igKey}>
                    <span 
                        style={{textTransform: 'capitalize'}}>
                        {igKey}
                    </span>
                    :{props.ingredients[igKey]}
                </li>);
        }else{return null}});
    return(
        <Aux>
            <h3 id="orderSummary">Your Order</h3>
            
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <p><strong>Total Price: ${props.totalPrice.toFixed(2)} </strong></p>
            <Button clicked={props.cancelPurchase} buttonType={"Danger"}>CANCEL</Button>
            <Button clicked={props.continuePurchase} buttonType={"Success"}>CONTINUE</Button>
        </Aux>

    );
};

export default orderSummary;