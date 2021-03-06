import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/users/userSlice";

// types

// preloadedState

// configure Store

export const store = configureStore({
  reducer: {
    users: userSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
