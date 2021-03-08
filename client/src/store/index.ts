import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/users/userSlice";
import { productSlice } from "../features/products/productSlice";
import { toastSlice } from "../features/toast/toastSlice";

interface IUserInit {
  username: string;
  email: string;
  token: string;
  _id: string;
}

const userInit: IUserInit = {
  username: "",
  email: "",
  token: "",
  _id: "",
};

// initState from localStorage
const userInfoFromLocalStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return userInit;
  }
};

// types
interface IPreloadedState {
  users: {
    userInfo: IUserInit;
    loading: boolean;
    error: any;
  };
}

const preloadedState: IPreloadedState = {
  users: {
    userInfo: userInfoFromLocalStorage(),
    loading: false,
    error: "",
  },
};

// configure Store
export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    products: productSlice.reducer,
    toast: toastSlice.reducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
