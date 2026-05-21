import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const burger = (props) => {
    let breadBottom = <BurgerIngredient type="bread-bottom"/>;
    let breadTop = <BurgerIngredient type="bread-top"/>;
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {  
        return [...Array(props.ingredients[igKey])].map((_, i) => {
           return <BurgerIngredient key={igKey + i} type={igKey}/>
        });
    }).reduce((arr,el) => {
        return arr.concat(el)
    }, []);
    
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!!</p>
    }
    switch (props.typeBurger) {
        case 'crabbypatty':
            breadBottom = <BurgerIngredient type="bread-bottom-black"/>;
            breadTop = <BurgerIngredient type="bread-top-black"/>;
            break;
    
        default:
            breadBottom = <BurgerIngredient type="bread-bottom"/>;
            breadTop = <BurgerIngredient type="bread-top"/>;
            break;
    }
    return (
        <div className={classes.Burger}>
            {breadTop}
            {transformedIngredients}
            {breadBottom}
        </div>
    );

};

export default burger;