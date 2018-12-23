import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const cardState = {
    products: [],
    cartData: []
}

const cart = (state = cardState, action) => {
    switch (action.type) {
        case types.ALL_PRODUCTS:
            return {
            	...state,
            	products: action.data
            };
        case types.CART_DATA:
            return {
            	...state,
            	cartData: action.data
            };
        default:
          	return state;
    }
};


const rootReducer = combineReducers({
    cart,
    routing
});

export default rootReducer;
