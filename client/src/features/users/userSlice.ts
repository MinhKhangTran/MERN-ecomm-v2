import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toastError, toastSuccess } from "../toast/toastSlice";
import { clearShoppingAddress } from "../cart/cartSlice";
import { RootState } from "../../store";
axios.defaults.headers.post["Content-Type"] = "application/json";

// types
interface IUserInfo {
  _id: string;
  username: string;
  email: string;
  token: string;
  role: "benutzer" | "admin";
}
interface IInitState {
  loading: boolean;
  error: any;
  userInfo: IUserInfo | null;
  users: IUserInfo[] | null;
  änderung: boolean;
  user: IUserInfo | null;
}

// initState
const initState: IInitState = {
  loading: false,
  error: "",
  userInfo: {
    username: "",
    email: "",
    token: "",
    _id: "",
    role: "benutzer",
  },
  users: null,
  änderung: false,
  user: {
    username: "",
    email: "",
    token: "",
    _id: "",
    role: "benutzer",
  },
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
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(toastSuccess("Willkommen zurück"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

// register
export const register = createAsyncThunk(
  "users/register",
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post("/api/a1/users/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(toastSuccess("Wilkommen"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Logout
export const logoutUser = createAsyncThunk(
  "users/logout",
  async (_, { dispatch }) => {
    dispatch(toastSuccess("Bis bald :D"));
    localStorage.removeItem("userInfo");
    dispatch(clearShoppingAddress());
    return initState;
  }
);

// update Profile
export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const {
        users: { userInfo },
      } = getState() as RootState;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put(
        `api/a1/users/me`,
        { username, email, password },
        config
      );
      dispatch(toastSuccess("Erfolgreich geändert"));
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(login({ email, password }));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// get Profiles ADMIN
export const getAllProfiles = createAsyncThunk(
  "users/getAllProfiles",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const {
        users: { userInfo },
      } = getState() as RootState;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get("/api/a1/users", config);
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// get Profile by Id ADMIN
export const getProfileById = createAsyncThunk(
  "users/getProfileById",
  async ({ id }: { id: string }, { dispatch, getState, rejectWithValue }) => {
    try {
      const {
        users: { userInfo },
      } = getState() as RootState;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get(`/api/a1/users/${id}`, config);
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// update Profile ADMIN
export const updateProfileAsAdmin = createAsyncThunk(
  "users/updateProfileAsAdmin",
  async (
    {
      username,
      email,
      role,
      id,
    }: {
      username: string;
      email: string;
      role: "benutzer" | "admin";
      id: string;
    },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const {
        users: { userInfo },
      } = getState() as RootState;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put(
        `api/a1/users/${id}`,
        { username, email, role },
        config
      );
      dispatch(toastSuccess("Erfolgreich geändert"));
      localStorage.setItem("userInfo", JSON.stringify(data));
      // dispatch(login({ email, password }));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// delete Profile ADMIN
export const deleteProfile = createAsyncThunk(
  "users/deleteProfile",
  async ({ id }: { id: string }, { dispatch, getState, rejectWithValue }) => {
    try {
      const {
        users: { userInfo },
      } = getState() as RootState;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.delete(`/api/a1/users/${id}`, config);
      dispatch(toastSuccess("User wurde gelöscht!"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    clearÄnderung: (state) => {
      state.änderung = false;
    },
  },
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
    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.userInfo = payload;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ======================LOGOUT======================

    builder.addCase(logoutUser.fulfilled, (state) => {
      return initState;
    });
    // update own profile
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.userInfo = payload;
    });
    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // ======================ADMIN======================
    // get all profiles
    builder.addCase(getAllProfiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProfiles.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.users = payload;
    });
    builder.addCase(getAllProfiles.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // get profile by Id
    builder.addCase(getProfileById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfileById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.user = payload;
    });
    builder.addCase(getProfileById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // Delete a user by id
    builder.addCase(deleteProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProfile.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.änderung = true;
    });
    builder.addCase(deleteProfile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // update any profile
    builder.addCase(updateProfileAsAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfileAsAdmin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.änderung = true;
    });
    builder.addCase(updateProfileAsAdmin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { clearÄnderung } = userSlice.actions;
