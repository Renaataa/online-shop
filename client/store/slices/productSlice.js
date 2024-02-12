import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateCode } from "../../enums/EnumState";

const defaultState = {
	product: {},
	stateProduct: {
		state: StateCode.Idle,
		description: "initial state",
	},
};

export const loadProduct = createAsyncThunk(
	"product/loadProduct",
	async (productId) => {
		const resp = await fetch(
			`http://192.168.8.158:5000/api/device/${productId}`
		);
		return await resp.json();
	}
);

const productSlice = createSlice({
	name: "product",
	initialState: defaultState,
	reducers: {},
	extraReducers: (build) => {
		build
			.addCase(loadProduct.fulfilled, (state, action) => {
				state.product = action.payload ? action.payload : {};
				state.stateProduct.state = StateCode.OK;
				state.stateProduct.description =
					"request successfully completed";
			})
			.addCase(loadProduct.rejected, (state) => {
				state.stateProduct.state = StateCode.Error;
				state.stateProduct.description = "rejected request to database";
			})
			.addCase(loadProduct.pending, (state) => {
				state.stateProduct.state = StateCode.Processing;
				state.stateProduct.description = "request loading";
			});
	},
});

export const {} = productSlice.actions;
export const productReducer = productSlice.reducer;
