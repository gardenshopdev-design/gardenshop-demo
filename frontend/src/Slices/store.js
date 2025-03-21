import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./AllProductsSlice";
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});