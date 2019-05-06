import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICE = {
    salad: 0.5,
    crabbysalad: 0.75,
    cheese: 0.4,
    crabbycheese: 0.6,
    meat: 1.3,
    crabbypatty: 1.75,
    bacon: 0.7,
    crabbybacon: 1.0,
    pickle: 0.2,
    crabbypickle: 0.5,
}
const defaultIngredients = {
    pickle: 0,
    crabbypickle: 0,
    salad: 0,
    crabbysalad: 0,
    bacon: 0,
    crabbybacon: 0,
    cheese: 0,
    swisscheese: 0,
    crabbycheese: 0,
    meat: 0, 
    crabbypatty: 0
    
};
class BurgerBuilder extends Component{
    state = {
        ingredients: defaultIngredients,
        totalPrice: 4,
        typeBurger: 'regular',
        purchasable: false,
        purchasing: false,

    }
    handleChange(event) {
        this.setState({typeBurger: event.target.value});
      }
    selectTypeOfBurger = (type) => {
        this.setState({typeBurger: type, ingredients: defaultIngredients, totalPrice: 4});        
    };
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        },0);
        this.setState({purchasable: sum > 0});
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        alert('You Continue');
    }
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
        this.updatePurchaseState(updateIngredients);
    };
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;

        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice  = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    };
    
    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        totalPrice={this.state.totalPrice}
                        cancelPurchase={this.purchaseCancelHandler}
                        continuePurchase={this.purchaseContinueHandler}
                        />
                </Modal>
                <Burger ingredients={this.state.ingredients} typeBurger={this.state.typeBurger}/> 
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    typeOfBurger={this.selectTypeOfBurger}
                    typeBurger={this.state.typeBurger}
                    handleTypeChange={this.handleChange}
                /> 
            </Aux>
        );
    }

}


export default BurgerBuilder;

