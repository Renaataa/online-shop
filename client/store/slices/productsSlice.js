import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const defaultState = {
    products: [],
    stateProducts: {
        loading: 'idle'
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

export const { } = productsSlice.actions
export const productsReducer = productsSlice.reducer

