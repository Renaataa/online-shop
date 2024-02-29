import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateCode } from "../../enums/EnumState";

const defaultState = {
	products: [],
	countProducts: 0,
	imgSize: 140,
	stateProducts: {
		state: StateCode.Idle,
		description: "initial state",
	},
};

export const loadProducts = createAsyncThunk(
	"products/loadProducts",
	async (requestSettings) => {
		const resp = await fetch(
			`http://192.168.8.158:5000/api/device?page=${requestSettings.page}&limit=${requestSettings.limit}${requestSettings.brandId}${requestSettings.typeId}`
		);
		return await resp.json();
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState: defaultState,
	reducers: {
		setImgSize: (state, action) => {
			state.imgSize = action.payload;
		},
	},
	extraReducers: (build) => {
		build
			.addCase(loadProducts.fulfilled, (state, action) => {
				state.products = action.payload.rows;
				state.countProducts = action.payload.count;
				state.stateProducts.state = StateCode.OK;
				state.stateProducts.description = "request successfully completed";
			})
			.addCase(loadProducts.rejected, (state) => {
				state.stateProducts.state = StateCode.Error;
				state.stateProducts.description = "rejected request to database";
			})
			.addCase(loadProducts.pending, (state) => {
				state.stateProducts.state = StateCode.Processing;
				state.stateProducts.description = "request loading";
			});
	},
});

export const { setImgSize } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
