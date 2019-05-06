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
                {label: 'Pickle', type: 'crabbypickle'},
                {label: 'Salad', type: 'crabbysalad'},
                {label: 'Bacon', type: 'crabbybacon'},
                {label: 'Cheese', type: 'crabbycheese'},
                {label: 'Patty', type: 'crabbypatty'},
            ];
            break;
    
        default:
        controls = [
            {label: 'Pickle', type: 'pickle'},
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
                <p>Current Price: <strong>{props.price.toFixed(2)}</strong> </p>
                {controls.map(ctrl => (
                        <BuildControl
                            key={ctrl.label} 
                            label={ctrl.label} 
                            value={ctrl.type}
                            added={() => props.ingredientAdded(ctrl.type)}
                            removed={() => props.ingredientRemove(ctrl.type)}
                            disabled={props.disabled[ctrl.type]}
                        />
                ))}
               <button 
                    className={classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={props.ordered}>
                    ORDER NOW
                </button> 
        </div>
   )
   };

export default buildControls;