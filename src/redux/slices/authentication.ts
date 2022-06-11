import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import storageService, { Locals } from "../../utils/storageService";
import { Response } from "../../models/response";
import api from "../../hooks/api/api";


const cachedUser = storageService.getObject(Locals.USER);
const cachedAccessToken = storageService.getItem(Locals.ACCESS_TOKEN);
const cachedAuthorization = storageService.getItem(Locals.AUTHORIZATIONS);

const LOGIN_URL = '/api/login';

// TODO: for testing purposes only, delete later
interface User {
  name: string;
  email: string;
}

export interface AuthenticationState {
  user: User;
  isLoggedIn: boolean;
  authorizations: string[];
  fetching: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResp {
  access_token: string;
}


export const loginThunk = createAsyncThunk<Response<LoginResp>, LoginRequest>(
  LOGIN_URL,
  async ({ email, password }, thunkAPI) => {

    try {
      const data = await api.post<LoginResp>(LOGIN_URL, {email, password});
      return data;
    } catch (error) {
      //thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: AuthenticationState = {
  user: cachedUser,
  isLoggedIn: !!cachedAccessToken,
  authorizations: cachedAuthorization,
  fetching: false,
};

const loginCases = (
  asyncThunk,
  builder: ActionReducerMapBuilder<AuthenticationState>
): void => {
  builder.addCase(asyncThunk.fulfilled, (state, action) => {
    state.isLoggedIn = !!action.payload.getFirstData().access_token;
    state.fetching = false;
  });
  builder.addCase(asyncThunk.pending, (state, action) => {
    state.fetching = true;
  });
  builder.addCase(asyncThunk.rejected, (state, action) => {
    state.isLoggedIn = false;
    state.fetching = false;
  });
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  extraReducers: (builder) => {
    loginCases(loginThunk, builder);
  },
  reducers:{
    logout: (state) => {
      state.isLoggedIn = false;
    }
  } 
});

export const authenticationAction = authenticationSlice.actions;

export default authenticationSlice.reducer;
