import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {StateCode} from 'C:/Users/renat/Desktop/Prog/Lessons/online-shop/client/enums/EnumState.ts'; // State or StateCode ????????????

const defaultState = {
    types: [],
    stateType: {
        state: StateCode[0],
        description: 'initial state'
    }
}
    
export const loadType = createAsyncThunk('type/loadType', async () => {
    const resp = await fetch(`http://127.0.0.1:5000/api/type`)
    return await resp.json()
})

const typeSlice = createSlice({
    name: 'type',
    initialState: defaultState,
    reducers: {
        //reducer
    },
    extraReducers: (build) => {
        build
            // addCase - То, что возвращается - является, новым состоянием 
            .addCase(loadType.fulfilled, (state, action) => {
                //console.log(action.payload, 'oneDevice')
                state.types = action.payload
                state.stateType.state = StateCode[200]
                state.stateType.description = 'request successfully completed'

                // Пересоздавала память. 
                //state = action.payload.rows 
                
                // Вариант добавления значения в массив 
                //state.push(...action.payload.rows)
                
                // str, number, bool ... -> return newState 
                
                //return action.payload.rows
            })
            .addCase(loadType.rejected, (state) => {
                state.stateType.state = StateCode[500]
                state.stateType.description = 'rejected request to database'
})
            .addCase(loadType.pending, (state) => {
                state.stateType.state = StateCode[102]
                state.stateType.description = 'request loading'

            })
    }
})

export const { } = typeSlice.actions
export const typeReducer = typeSlice.reducer

