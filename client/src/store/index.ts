import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/users/userSlice";
import { productSlice } from "../features/products/productSlice";
import { toastSlice } from "../features/toast/toastSlice";
import { cartSlice } from "../features/cart/cartSlice";

interface IUserInit {
  username: string;
  email: string;
  token: string;
  _id: string;
  role: "benutzer" | "admin";
}

const userInit: IUserInit = {
  username: "",
  email: "",
  token: "",
  _id: "",
  role: "benutzer",
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
const cartInfoFromLocalStorage = () => {
  const cartInfo = localStorage.getItem("cartInfo");
  if (cartInfo) {
    return JSON.parse(cartInfo);
  } else {
    return [];
  }
};
const shipingAddressFromLocalStorage = () => {
  const shipingAddress = localStorage.getItem("shipingAddress");
  if (shipingAddress) {
    return JSON.parse(shipingAddress);
  } else {
    return null;
  }
};

// types
interface IPreloadedState {
  users: {
    userInfo: IUserInit;
    loading: boolean;
    error: any;
  };
  cart: {
    cartInfo: [];
    shipingAddress?: null;
  };
}

const preloadedState: IPreloadedState = {
  users: {
    userInfo: userInfoFromLocalStorage(),
    loading: false,
    error: "",
  },
  cart: {
    cartInfo: cartInfoFromLocalStorage(),
    shipingAddress: shipingAddressFromLocalStorage(),
  },
};

// configure Store
export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    products: productSlice.reducer,
    toast: toastSlice.reducer,
    cart: cartSlice.reducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
