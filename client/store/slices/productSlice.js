import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {StateCode} from 'C:/Users/renat/Desktop/Prog/Lessons/online-shop/client/enums/EnumState.ts'; 

const defaultState = {
    product: [],
    stateProduct: {
        state: StateCode.Idle,
        description: ''
    }
}
    
export const loadProduct = createAsyncThunk('product/loadProduct', async (productId) => {
    const resp = await fetch(`http://192.168.8.158:5000/api/device/${productId}`)
    return await resp.json()
})

const productSlice = createSlice({
    name: 'product',
    initialState: defaultState,
    reducers: {
        //reducer
    },
    extraReducers: (build) => {
        build
            // addCase - То, что возвращается - является, новым состоянием 
            .addCase(loadProduct.fulfilled, (state, action) => {
                //console.log(action.payload, 'oneDevice')
                state.product = action.payload
                state.stateProduct.state = StateCode.OK
                state.stateProduct.description = 'request successfully completed'

                // Пересоздавала память. 
                //state = action.payload.rows 
                
                // Вариант добавления значения в массив 
                //state.push(...action.payload.rows)
                
                // str, number, bool ... -> return newState 
                
                //return action.payload.rows
            })
            .addCase(loadProduct.rejected, (state) => {
                state.stateProduct.state = StateCode.Error
                state.stateProduct.description = 'rejected request to database'
            })
            .addCase(loadProduct.pending, (state) => {
                state.stateProduct.state = StateCode.Processing
                state.stateProduct.description = 'request loading'
            })
    }
})

export const { } = productSlice.actions
export const productReducer = productSlice.reducer

