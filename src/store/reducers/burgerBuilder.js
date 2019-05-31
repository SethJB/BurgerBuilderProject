import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    // ingredients: {
    //     pickle: 0,
    //     crabbypickle: 0,
    //     salad: 0,
    //     crabbysalad: 0,
    //     bacon: 0,
    //     crabbybacon: 0,
    //     cheese: 0,
    //     swisscheese: 0,
    //     crabbycheese: 0,
    //     meat: 0, 
    //     crabbypatty: 0
    // },
    totalPrice: 4,
    error: false,    
};

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

const addIngredient = (state, action) => {
    const updateIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1 };
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updatedState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
    }
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updateIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] - 1 };
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updatedState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
    }
    return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
    return updateObject(state,{
        ingredients: {
            pickle: action.ingredients.pickle,
            crabbypickle: action.ingredients.crabbypickle,
            salad: action.ingredients.salad,
            crabbysalad: action.ingredients.crabbysalad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            crabbycheese: action.ingredients.crabbycheese,
            meat: action.ingredients.meat,
            crabbypatty: action.ingredients.crabbypatty
        },
        totalPrice: 4,
        error: false
    });
};
const reducer = (state = initialState, action) => {
    
    if(action.type === actionType.ADD_INGREDIENT) return addIngredient(state,action)
    if(action.type === actionType.REMOVE_INGREDIENT) return removeIngredient(state, action) 
    if(action.type === actionType.SET_INGREDIENTS) return setIngredients(state, action)    
    if(action.type === actionType.FETCH_INGREDIENTS_FAILED) return updateObject(state,{ error: true })
    return state;
};


export default reducer;