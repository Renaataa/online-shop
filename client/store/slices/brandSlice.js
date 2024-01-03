import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {StateCode} from 'C:/Users/renat/Desktop/Prog/Lessons/online-shop/client/enums/EnumState.ts'; // State or StateCode ????????????

const defaultState = {
    brands: [],
    stateBrand: {
        state: StateCode[0],
        description: 'initial state'
    }
}
    
export const loadBrand = createAsyncThunk('brand/loadBrand', async () => {
    const resp = await fetch(`http://127.0.0.1:5000/api/brand`)
    return await resp.json()
})

const brandSlice = createSlice({
    name: 'brand',
    initialState: defaultState,
    reducers: {
        //reducer
    },
    extraReducers: (build) => {
        build
            // addCase - То, что возвращается - является, новым состоянием 
            .addCase(loadBrand.fulfilled, (state, action) => {
                //console.log(action.payload, 'oneDevice')
                state.brands = action.payload
                state.stateBrand.state = StateCode[200]
                state.stateBrand.description = 'request successfully completed'

                // Пересоздавала память. 
                //state = action.payload.rows 
                
                // Вариант добавления значения в массив 
                //state.push(...action.payload.rows)
                
                // str, number, bool ... -> return newState 
                
                //return action.payload.rows
            })
            .addCase(loadBrand.rejected, (state) => {
                state.stateBrand.state = StateCode[500]
                state.stateBrand.description = 'rejected request to database'
})
            .addCase(loadBrand.pending, (state) => {
                state.stateBrand.state = StateCode[102]
                state.stateBrand.description = 'request loading'

            })
    }
})

export const { } = brandSlice.actions
export const brandReducer = brandSlice.reducer

