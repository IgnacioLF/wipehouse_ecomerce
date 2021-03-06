
export const existingCartItem = ({ prevCartItems, nextCartItem}) => {
    return prevCartItems.find( cartItem => 
        cartItem.documentID === nextCartItem.documentID
    )
}

export const handleAddToCart = ({prevCartItems, nextCartItem}) => {
    const quantityIncrement = 1;
    const cartItemExists = existingCartItem({prevCartItems, nextCartItem})

    if (cartItemExists) {
        return prevCartItems.map( cartItem => 
            cartItem.documentID === nextCartItem.documentID 
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + nextCartItem.quantity 
                } : cartItem
        )
    }
    if (nextCartItem.quantity>1) {
        return [
            ...prevCartItems,
            {
                ...nextCartItem,
            }
        ]
    }

    return [
        ...prevCartItems,
        {
            ...nextCartItem,
            quantity: quantityIncrement
        }
    ]
}

export const handeRemoveCartItem = ({prevCartItems, cartItemToRemove}) => {
    return prevCartItems.filter(item => item.documentID !== cartItemToRemove.documentID)
}

export const handleReduceCartItem = ({prevCartItems, cartItemToReduce}) => {
    const existingCartItem = prevCartItems.find(cartItem => cartItem.documentID === cartItemToReduce.documentID)

    if (existingCartItem.quantity === 1) {
        return prevCartItems.filter(item => item.documentID !== existingCartItem.documentID)
    }

    return prevCartItems.map(cartItem => 
        cartItem.documentID === existingCartItem.documentID ? 
        {
            ...cartItem,
            quantity: cartItem.quantity -1
        } : cartItem)
}