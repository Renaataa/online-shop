import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateCode } from "../../enums/EnumState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
global.atob = decode;

const defaultState = {
	auth: false,
	email: "",
	stateUser: {
		state: StateCode.Idle,
		description: "initial state",
	},
};

export const authUser = createAsyncThunk("user/authUser", async (token) => {
	const resp = await axios.get(`http://192.168.8.158:5000/api/user/auth`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
	return resp.data;
});

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
	try {
		const resp = await axios.post(
			`http://192.168.8.158:5000/api/user/login`,
			{
				email: data.email,
				password: data.password,
			}
		);
		return {
			status: "OK",
			response: { token: resp.data.token, email: data.email },
		};
	} catch (err) {
		return {
			status: "ERROR",
			response: err.response.data.message,
		};
	}
});

export const registrateUser = createAsyncThunk(
	"user/registrateUser",
	async (data) => {
		try {
			const resp = await axios.post(
				`http://192.168.8.158:5000/api/user/registration`,
				{
					email: data.email,
					password: data.password,
					role: "USER",
				}
			);
			return {
				status: "OK",
				response: resp.data.token,
			};
		} catch (err) {
			return {
				status: "ERROR",
				response: err.response.data.message,
			};
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: defaultState,
	reducers: {
		setAuth: (state, action) => {
			state.auth = action.payload;
		},
		logout: (state, action) => {
			state.auth = false;
			state.email = "";
			AsyncStorage.removeItem("token");
		},
		resetState: (state, action) => {
			state.stateUser.state = StateCode.Idle;
			state.stateUser.description = "";
		},
		setError: (state, action) => {
			state.stateUser.state = StateCode.Error;
			state.stateUser.description = action.payload;
		},
	},
	extraReducers: (build) => {
		build
			.addCase(authUser.fulfilled, (state, action) => {
				state.stateUser.state = StateCode.OK;
				state.stateUser.description = "request successfully completed";

				const decoded = jwtDecode(action.payload.token);

				state.email = decoded.email;
				state.auth = true;
				AsyncStorage.setItem("token", action.payload.token);
			})
			.addCase(authUser.rejected, (state, action) => {
				state.stateUser.state = StateCode.Error;
				state.stateUser.description = "rejected request to database";

				state.email = "";
				state.auth = false;
				AsyncStorage.removeItem("token");
			})
			.addCase(authUser.pending, (state) => {
				state.stateUser.state = StateCode.Processing;
				state.stateUser.description = "request loading";
			})

			.addCase(loginUser.fulfilled, (state, action) => {
				console.log(action);
				if (action.payload.status == "OK") {
					state.stateUser.state = StateCode.OK;
					state.stateUser.description =
						"request successfully completed";

					state.email = action.payload.response.email;
					state.auth = true;
					AsyncStorage.setItem(
						"token",
						action.payload.response.token
					);
				} else {
					state.stateUser.state = StateCode.Error;
					state.stateUser.description = action.payload.response;

					state.email = "";
					state.auth = false;
					AsyncStorage.removeItem("token");
				}
			})
			.addCase(loginUser.pending, (state) => {
				state.stateUser.state = StateCode.Processing;
				state.stateUser.description = "request loading";
			})

			.addCase(registrateUser.fulfilled, (state, action) => {
				if (action.payload.status == "OK") {
					state.stateUser.state = StateCode.OK;
					state.stateUser.description =
						"request successfully completed";

					state.email = action.meta.arg.email;
					state.auth = true;
					AsyncStorage.setItem("token", action.payload.response);
				} else {
					state.stateUser.state = StateCode.Error;
					state.stateUser.description = action.payload.response;

					state.email = "";
					state.auth = false;
					AsyncStorage.removeItem("token");
				}
			})
			.addCase(registrateUser.pending, (state) => {
				state.stateUser.state = StateCode.Processing;
				state.stateUser.description = "request loading";
			});
	},
});

export const { setAuth, logout, resetState, setError } = userSlice.actions;
export const userReducer = userSlice.reducer;
