import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/users/userSlice";
import { productSlice } from "../features/products/productSlice";

// types

// preloadedState

// configure Store
export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    products: productSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
