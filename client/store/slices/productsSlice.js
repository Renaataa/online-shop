import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {StateCode} from '../../enums/EnumState'; 

const defaultState = {
    products: [],
    countProducts: 0,
    stateProducts: {
        state: StateCode[0],
        description: ''
    }
}
    
export const loadProducts = createAsyncThunk('products/loadProducts', async (requestSettings) => {
    const resp = await fetch(`http://192.168.8.158:5000/api/device?page=${requestSettings.page}&limit=${requestSettings.limit}${requestSettings.brandId}${requestSettings.typeId}`)
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
                state.countProducts = action.payload.count
                state.stateProducts.state = StateCode.OK
                state.stateProducts.description = 'request successfully completed'

                // Пересоздавала память 
                //state = action.payload.rows 
                
                // Вариант добавления значения в массив 
                //state.push(...action.payload.rows)
                
                // str, number, bool ... -> return newState 
                //return action.payload.rows
            })
            .addCase(loadProducts.rejected, (state) => {
                state.stateProducts.state = StateCode.Error
                state.stateProducts.description = 'rejected request to database'
            })
            .addCase(loadProducts.pending, (state) => {
                state.stateProducts.state = StateCode.Processing
                state.stateProducts.description = 'request loading'
            })
    }
})

export const { } = productsSlice.actions
export const productsReducer = productsSlice.reducer

