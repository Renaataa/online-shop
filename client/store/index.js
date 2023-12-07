import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";
import { productReducer } from "./slices/productSlice";


export default configureStore({
    reducer: {
        productsReducer,
        productReducer
    } 
});