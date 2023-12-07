import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//const {Device, DeviceInfo} = require('C:/Users/renat/Desktop/Prog/Lessons/online-shop/server/models/models')


const defaultState = [
    {
        "rating": 0,
        "id": 1,
        "name": "Galaxy S5",
        "price": "4500",
        "brandId": "1",
        "typeId": "2",
        "img": "a541185e-62d8-42f2-b55c-b82f2fec8658.jpg",
        "updatedAt": "2023-12-06T18:30:10.524Z",
        "createdAt": "2023-12-06T18:30:10.524Z"
    },
    {
        "rating": 0,
        "id": 2,
        "name": "Galaxy S24",
        "price": "4000",
        "brandId": "1",
        "typeId": "2",
        "img": "a541185e-62d8-42f2-b55c-b82f2fec8658.jpg",
        "updatedAt": "2023-12-06T18:30:10.524Z",
        "createdAt": "2023-12-06T18:30:10.524Z"
    }
]

// async getAll(req, res) {
//         const brands = await Brand.findAll()
//         return res.json(brands)
// }
    
// export const loadProducts = createAsyncThunk('products/loadProducts', async (value) => {
//     console.log(value)
//     const resp = await Products.findAll()
//     console.log(resp, resp.json())
//     return await resp.json()
// })

const productsSlice = createSlice({
    name: 'products',
    initialState: defaultState,
    reducers: {
        //reducer
    }
    // extraReducers: (build) => {
    //     build
    //         .addCase(loadProducts.fulfilled, (state, action) => {
    //             state = action.payload
    //             //state.postsLoadState.state = 'success'
    //         })
            // .addCase(loadProducts.rejected, (state) => {
            //     state.postsLoadState.state = 'error'
            //     state.postsLoadState.text = 'Произошла ошибка при загрузке постов, попробуйте позже'
            // })
            // .addCase(loadProducts.pending, (state) => {
            //     state.postsLoadState.state = 'loading'
            // })
    // }
})


export const { } = productsSlice.actions
export const productsReducer = productsSlice.reducer

