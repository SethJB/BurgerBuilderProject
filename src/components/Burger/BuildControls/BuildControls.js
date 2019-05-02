import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import BurgerSelector from './BuildControl/BurgerSelecter';


const typeOfBurger = [
    {label: 'Regular', type: 'regular'},
    {label: 'Crabby Patty', type: 'crabbypatty'},
];
let controls = [ ];
const buildControls = (props) => {
    
    switch (props.typeBurger) {
        case 'crabbypatty':
            controls = [
                {label: 'Salad', type: 'crabbysalad'},
                {label: 'Bacon', type: 'bacon'},
                {label: 'Cheese', type: 'crabbycheese'},
                {label: 'Patty', type: 'crabbypatty'},
            ];
            break;
    
        default:
        controls = [
            {label: 'Salad', type: 'salad'},
            {label: 'Bacon', type: 'bacon'},
            {label: 'Cheese', type: 'cheese'},
            {label: 'Meat', type: 'meat'},
            ];
            break;
    }

   
   return (
        <div className={classes.BuildControls}>
            <div className={classes.TypeSelector}>
            {typeOfBurger.map(bgr => (
                    <BurgerSelector
                        key={bgr.label} 
                        label={bgr.label} 
                        name={bgr.type}
                        typeBurgerCheck={props.typeBurger}
                        changeType={() => props.typeOfBurger(bgr.type)}
                        handleChange={props.handleChangetype}
                    />
                ))}
                </div>
                {controls.map(ctrl => (
                        <BuildControl
                            key={ctrl.label} 
                            label={ctrl.label} 
                            value={ctrl.type}
                            added={() => props.ingredientAdded(ctrl.type)}
                        />
                ))}
        </div>
   )
   };

export default buildControls;