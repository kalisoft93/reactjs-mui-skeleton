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

const LOGIN_URL = '';

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
  jwt: string;
}


export const loginThunk = createAsyncThunk<Response<LoginResp>, LoginRequest>(
  LOGIN_URL,
  async ({ email, password }, thunkAPI) => {

    try {
      const data = await api.get<LoginResp>(LOGIN_URL, {email, password});
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
    state.isLoggedIn = !!action.payload;
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
  reducers: {},
  extraReducers: (builder) => {
    loginCases(loginThunk, builder);
  },
});

export const authenticationAction = authenticationSlice.actions;

export default authenticationSlice.reducer;
