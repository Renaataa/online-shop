import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {StateCode} from 'C:/Users/renat/Desktop/Prog/Lessons/online-shop/client/enums/EnumState.ts'; // State or StateCode ????????????
// relative path ???????????????

const defaultState = {
    products: [],
    stateProducts: {
        state: StateCode[0],
        description: ''
    }
}
    
export const loadProducts = createAsyncThunk('products/loadProducts', async (requestSettings) => {
    const resp = await fetch(`http://127.0.0.1:5000/api/device?page=${requestSettings.page}&limit=${requestSettings.limit}${requestSettings.brandId}${requestSettings.typeId}`)
    return await resp.json()
})

const productsSlice = createSlice({
    name: 'products',
    initialState: defaultState,
    reducers: {
        //reducer
    },
    extraReducers: (build) => {
        build
            // addCase - То, что возвращается - является, новым состоянием 
            .addCase(loadProducts.fulfilled, (state, action) => {
                //console.log(action.payload.rows, 'data')
                state.products = action.payload.rows
                state.stateProducts.state = StateCode[200]
                state.stateProducts.description = ''

                // Пересоздавала память 
                //state = action.payload.rows 
                
                // Вариант добавления значения в массив 
                //state.push(...action.payload.rows)
                
                // str, number, bool ... -> return newState 
                //return action.payload.rows
            })
            .addCase(loadProducts.rejected, (state) => {
                state.stateProducts.state = StateCode[500]
                state.stateProducts.description = 'rejected request to database'
            })
            .addCase(loadProducts.pending, (state) => {
                state.stateProducts.state = StateCode[102]
                state.stateProducts.description = ''
            })
    }
})

export const { } = productsSlice.actions
export const productsReducer = productsSlice.reducer

