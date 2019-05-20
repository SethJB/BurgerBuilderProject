import React from 'react';
import classes from './Order.module.css'

const order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        if(ig.amount !== 0){
            return <div><span style={{textTransform: 'capitalize'}}className={classes.OrderDisplay} >{ig.name} ({ig.amount}) </span></div>;
        }
        return null
    })

    return(
        <div className={classes.Order}>
            <p>Order Key: </p>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;