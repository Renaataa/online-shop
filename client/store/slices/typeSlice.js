import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const defaultState = {
    types: []
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

                // Пересоздавала память. 
                //state = action.payload.rows 
                
                // Вариант добавления значения в массив 
                //state.push(...action.payload.rows)
                
                // str, number, bool ... -> return newState 
                
                //return action.payload.rows
                //state.postsLoadState.state = 'success'
            })
            // .addCase(loadProducts.rejected, (state) => {
            //     state.postsLoadState.state = 'error'
            //     state.postsLoadState.text = 'Произошла ошибка при загрузке постов, попробуйте позже'
            // })
            // .addCase(loadProducts.pending, (state) => {
            //     state.postsLoadState.state = 'loading'
            // })
    }
})

export const { } = typeSlice.actions
export const typeReducer = typeSlice.reducer

