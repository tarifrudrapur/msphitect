import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const cart = (state = '', action) => {
    switch (action.type) {
        case types.CART_DATA:
            return action.data;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    cart,
    routing
});

export default rootReducer;
