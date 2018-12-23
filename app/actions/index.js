import * as types from './types';
import { getProductList } from '../Helper' 

export function getProducts() {
    return {
        type: types.ALL_PRODUCTS,
        data: getProductList()
    };
}

export function addCart(data) {
    return {
        type: types.CART_DATA,
        data: data
    };
}
