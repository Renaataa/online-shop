import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateCode } from "../../enums/EnumState";

const defaultState = {
	brands: [],
	stateBrand: {
		state: StateCode.Idle,
		description: "initial state",
	},
};

export const loadBrand = createAsyncThunk("brand/loadBrand", async () => {
	const resp = await fetch(`http://192.168.8.158:5000/api/brand`);
	return await resp.json();
});

const brandSlice = createSlice({
	name: "brand",
	initialState: defaultState,
	reducers: {},
	extraReducers: (build) => {
		build
			.addCase(loadBrand.fulfilled, (state, action) => {
				state.brands = action.payload;
				state.stateBrand.state = StateCode.OK;
				state.stateBrand.description = "request successfully completed";
			})
			.addCase(loadBrand.rejected, (state) => {
				state.stateBrand.state = StateCode.Error;
				state.stateBrand.description = "rejected request to database";
			})
			.addCase(loadBrand.pending, (state) => {
				state.stateBrand.state = StateCode.Processing;
				state.stateBrand.description = "request loading";
			});
	},
});

export const {} = brandSlice.actions;
export const brandReducer = brandSlice.reducer;
