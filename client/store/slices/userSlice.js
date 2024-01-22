import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {StateCode} from '../../enums/EnumState'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const defaultState = {
    auth: false,
    email: '',
    stateUser: {
        state: StateCode.Idle,
        description: ''
    }
}
    
export const authUser = createAsyncThunk('user/authUser', async (token) => {
    const resp = await axios.get(`http://192.168.8.158:5000/api/user/auth`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return await resp.data
})

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
    const resp = await axios.post(`http://192.168.8.158:5000/api/user/login`, {
        email: data.email,
        password: data.password
    })
    return await resp.data
})

const userSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload
        }
    },
    extraReducers: (build) => {
        build
            // addCase - То, что возвращается - является, новым состоянием 
            .addCase(authUser.fulfilled, (state, action) => {
                state.stateUser.state = StateCode.OK
                state.stateUser.description = 'request successfully completed'
                const decoded = jwtDecode(action.payload.token);
                state.email = decoded.email
                state.auth = true
                AsyncStorage.setItem('token', action.payload.token) 
            })
            .addCase(authUser.rejected, (state, action) => {
                state.stateUser.state = StateCode.Error
                state.stateUser.description = 'rejected request to database'
                state.email = ''
                state.auth = false
                AsyncStorage.removeItem('token') 
            })
            .addCase(authUser.pending, (state) => {
                state.stateUser.state = StateCode.Processing
                state.stateUser.description = 'request loading'
            })
        
            .addCase(loginUser.fulfilled, (state, action) => {
                // я привязываюсь к stateUser.state в Арр.jsx ??????????????????????????????????????????????????
                state.stateUser.state = StateCode.OK
                state.stateUser.description = 'request successfully completed'

                state.email = action.meta.arg.email
                state.auth = true
                AsyncStorage.setItem('token', action.payload.token) 
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.stateUser.state = StateCode.Error
                state.stateUser.description = 'rejected request to database'
                state.email = ''
                state.auth = false
                AsyncStorage.removeItem('token') 
            })
            .addCase(loginUser.pending, (state) => {
                state.stateUser.state = StateCode.Processing
                state.stateUser.description = 'request loading'
            })
    }
})

export const { setAuth } = userSlice.actions
export const userReducer = userSlice.reducer

