const CartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.product] 
            };
        case 'REMOVE_FROM_CART':
            return { 
                ...state, cart: state.cart.filter(item => item._id !== action.payload) 
            };
        case 'UPDATE_CART_QTY':
            return {
                ...state,
                cart: state.cart.map(item => item._id === action.payload._id ? 
                { ...item, selectedQty: action.payload.selectedQty } : item)
            };
        default:
            return state;
    }
};

export default CartReducer;