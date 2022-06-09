import cartTypes from "./cart.types";
import { handeRemoveCartItem, handleAddToCart, handleReduceCartItem } from "./cart.utils";

const INITIAL_STATE = {
    cartItems: []
}

const cartReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case cartTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: handleAddToCart({
                    prevCartItems: state.cartItems,
                    nextCartItem: action.payload
                })
            }
        case cartTypes.REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: handeRemoveCartItem({
                    prevCartItems: state.cartItems,
                    cartItemToRemove: action.payload
                })
            }
        case cartTypes.REDUCE_CART_ITEM:
            return{
                ...state,
                cartItems: handleReduceCartItem({
                    prevCartItems: state.cartItems,
                    cartItemToReduce: action.payload
                })
            }
        default:
            return state;
    }
} 

export default cartReducer;