import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

// types
interface IUserInfo {}
interface IInitState {
  loading: boolean;
  error: any;
  userInfo: any | null;
}

// initState
const initState: IInitState = {
  loading: false,
  error: "",
  userInfo: null,
};

// async actions
// Login
export const login = createAsyncThunk(
  "users/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post("/api/a1/users/login", {
        email,
        password,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
// register
// get logged user
// update Profile
// get Profiles ADMIN
// get Profiles by ID ADMIN
// update Profile ADMIN
// delete Profile ADMIN

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.userInfo = payload;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
