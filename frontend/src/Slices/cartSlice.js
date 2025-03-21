import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, title, price, discont_price, image } = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({
                    id,
                    title,
                    price,
                    discont_price,
                    image,
                    quantity: 1,
                });
            }
            // console.log(state.cartItems);
            
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            console.log("cart cleared");
            
        },
    },
});

export const { addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
