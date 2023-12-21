import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const defaultState = {
    product: []
}
    
export const loadProduct = createAsyncThunk('product/loadProduct', async (productId) => {
    const resp = await fetch(`http://127.0.0.1:5000/api/device/${productId}`)
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

export const { } = productSlice.actions
export const productReducer = productSlice.reducer

