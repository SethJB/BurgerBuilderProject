import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseSuccess = (state, action) => {
    const newOrder = 
    updateObject(action.orderData, {
        id: action.orderId })
    return updateObject(state, {
        loading: false,
        purchased: true,
        order: state.orders.concat(newOrder),
    });
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
            orders: action.orders,
            loading: false,
        });
}

const reducer = (state = initialState, action) => {
    if(action.type === actionTypes.PURCHASE_BURGER_SUCCESS) return purchaseSuccess(state, action)
    if(action.type === actionTypes.PURCHASE_BURGER_FAIL) return updateObject(state, { loading: false })
    if(action.type === actionTypes.PURCHASE_BURGER_START) return updateObject(state, { loading: true })
    if(action.type === actionTypes.PURCHASE_INIT) return updateObject(state, { purchased: false })
    if(action.type === actionTypes.FETCH_ORDERS_START) return updateObject(state, { loading: true })
    if(action.type === actionTypes.FETCH_ORDERS_SUCCESS) return fetchOrderSuccess(state, action)
    if(action.type === actionTypes.FETCH_ORDERS_FAIL) return updateObject(state, { loading: false })
    return state;
};


export default reducer;