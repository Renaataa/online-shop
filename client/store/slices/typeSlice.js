import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateCode } from "../../enums/EnumState";

const defaultState = {
	types: [],
	stateType: {
		state: StateCode.Idle,
		description: "initial state",
	},
};

export const loadType = createAsyncThunk("type/loadType", async () => {
	const resp = await fetch(`http://192.168.8.158:5000/api/type`);
	return await resp.json();
});

const typeSlice = createSlice({
	name: "type",
	initialState: defaultState,
	reducers: {},
	extraReducers: (build) => {
		build
			.addCase(loadType.fulfilled, (state, action) => {
				state.types = action.payload;
				state.stateType.state = StateCode.OK;
				state.stateType.description = "request successfully completed";
			})
			.addCase(loadType.rejected, (state) => {
				state.stateType.state = StateCode.Error;
				state.stateType.description = "rejected request to database";
			})
			.addCase(loadType.pending, (state) => {
				state.stateType.state = StateCode.Processing;
				state.stateType.description = "request loading";
			});
	},
});

export const {} = typeSlice.actions;
export const typeReducer = typeSlice.reducer;
