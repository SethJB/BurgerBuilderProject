import React, { Component } from 'react'

import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    //This could be a function component and doesn't need to be a class
    render()
        {
            const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
            if (this.props.ingredients[igKey] > 0){
            return (
                <li key={igKey}>
                    <span 
                        style={{textTransform: 'capitalize'}}>
                        {igKey}
                    </span>
                    :{this.props.ingredients[igKey]}
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
                <p><strong>Total Price: ${this.props.totalPrice.toFixed(2)} </strong></p>
                <Button clicked={this.props.cancelPurchase} buttonType={"Danger"}>CANCEL</Button>
                <Button clicked={this.props.continuePurchase} buttonType={"Success"}>CONTINUE</Button>
            </Aux>
  
        );
    }
}

export default OrderSummary;