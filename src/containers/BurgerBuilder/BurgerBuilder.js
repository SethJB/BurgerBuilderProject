import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
const defaultIngredients = {
    salad: 0,
    crabbysalad: 0,
    bacon: 0,
    cheese: 0,
    crabbycheese: 0,
    crabbypatty: 0,
    meat: 0, 
    swisscheese: 0
};
class BurgerBuilder extends Component{
    state = {
        ingredients: defaultIngredients,
        totalPrice: 4,
        typeBurger: 'regular'

    }
    handleChange(event) {
        this.setState({typeBurger: event.target.value});
      }
    selectTypeOfBurger = (type) => {
        this.setState({typeBurger: type, ingredients: defaultIngredients, totalPrice: 4});        
    };
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice  = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
    };
    removeIngredientHandler = (type) => {

    };
    
    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} typeBurger={this.state.typeBurger}/> 
                 <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    typeOfBurger={this.selectTypeOfBurger}
                    typeBurger={this.state.typeBurger}
                    handleTypeChange={this.handleChange}
                 /> 
            </Aux>
        );
    }

}


export default BurgerBuilder;

