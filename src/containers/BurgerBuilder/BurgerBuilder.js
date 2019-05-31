import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import axios from '../../axios-instances/axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

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
        typeBurger: 'regular',
        purchasing: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
        // axios.get('https://react-my-burger-ed876.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error => {
        //     this.setState({error: true});
        // });
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
        return  sum > 0;
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    //     const queryParams = [];
    //     for (let i in this.state.ingredients){
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    //     }
    //     queryParams.push('price=' + this.state.totalPrice);
    //     const queryString = queryParams.join('&');

    //     this.props.history.push({
    //         pathname: '/checkout',
    //         search: '?' + queryString
    //     });
     }
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;

    //     const updateIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updateIngredients[type] = updatedCount;
        
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice  = oldPrice + priceAddition;
       
    //     this.setState({totalPrice: newPrice, ingredients: updateIngredients});
    //     this.updatePurchaseState(updateIngredients);
    // };
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;

    //     const updateIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updateIngredients[type] = updatedCount;
        
    //     const priceDeduction = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice  = oldPrice - priceDeduction;

    //     this.setState({totalPrice: newPrice, ingredients: updateIngredients});
    //     this.updatePurchaseState(updateIngredients);
    // };
    
    render(){
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        
        let burger = this.props.error ? <p>Ingredients CAN'T be loaded!!!! </p> : <Spinner/>
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} typeBurger={this.state.typeBurger}/> 
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        typeOfBurger={this.selectTypeOfBurger}
                        typeBurger={this.state.typeBurger}
                        handleTypeChange={this.handleChange}
                    /> 
                </Aux>
            );
            orderSummary = (
                <OrderSummary 
                        ingredients={this.props.ings} 
                        totalPrice={this.props.price}
                        cancelPurchase={this.purchaseCancelHandler}
                        continuePurchase={this.purchaseContinueHandler}
                />);
        };
        
        // if (this.state.loading){
        //     orderSummary = <Spinner />;
        // }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
}



export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));

