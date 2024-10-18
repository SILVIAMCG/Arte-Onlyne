const CartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            //verrificar i el articulo ya exite, si existe solo actualizar la cantidad
            const exist = state.cart.find(item => item._id === action.product._id);
            if (exist) {
                localStorage.setItem('cart', JSON.stringify(state.cart.map(item => item._id === action.product._id ?
                    { ...item, selectedQty: item.selectedQty + action.product.selectedQty } : item)));
                return {
                    ...state,
                    cart: state.cart.map(item => item._id === action.product._id ?
                        { ...item, selectedQty: item.selectedQty + action.product.selectedQty } : item)
                };
            }
            //si no existe agregar el articulo al carrito
            localStorage.setItem('cart', JSON.stringify([...state.cart, action.product]));
            return {
                ...state,
                cart: [...state.cart, action.product] 
            };
        case 'REMOVE_FROM_CART':
            localStorage.setItem('cart', JSON.stringify(state.cart.filter(item => item._id !== action.payload)));
            return { 
                ...state, cart: state.cart.filter(item => item._id !== action.payload) 
            };
        case 'UPDATE_CART_QTY':
            localStorage.setItem('cart', JSON.stringify(state.cart.map(item => item._id === action.payload._id ?
                { ...item, selectedQty: action.payload.selectedQty } : item)));
            return {
                ...state,
                cart: state.cart.map(item => item._id === action.payload._id ? 
                { ...item, selectedQty: action.payload.selectedQty } : item)
            };

        case 'CLEAR_CART':
            localStorage.removeItem('cart');
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
};

export default CartReducer;