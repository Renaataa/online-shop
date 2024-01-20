import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";
import { productReducer } from "./slices/productSlice";
import { brandReducer } from "./slices/brandSlice";
import { typeReducer } from "./slices/typeSlice";
import { userReducer } from "./slices/userSlice";

export default configureStore({
    reducer: {
        productsReducer,
        productReducer,
        brandReducer, 
        typeReducer,
        userReducer
    } 
});