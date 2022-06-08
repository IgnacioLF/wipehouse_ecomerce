import cartTypes from "./cart.types";

export const addProductToCart = (nextCartItem) => ({
    type: cartTypes.ADD_TO_CART,
    payload: nextCartItem
})