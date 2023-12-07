import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";


export default configureStore({
    reducer: {
       productsReducer
    } 
});