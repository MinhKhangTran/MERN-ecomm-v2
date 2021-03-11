import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { toastError, toastSuccess } from "../toast/toastSlice";

// es ist wie eine todo Liste. Die Produkte in den Warenkorb legen.

// types
interface ICartInfo {
  brand: string;
  image: string;
  name: string;
  qty: number;
  price: number;
  _id: string;
  countInStock: number;
}
interface IShipingAddress {
  address: string;
  city: string;
  plz: string;
  country: string;
}
interface IInitState {
  loading: boolean;
  error: any;
  cartInfo: ICartInfo[];
  shipingAddress: IShipingAddress | null;
}

// initState
const initState: IInitState = {
  loading: false,
  error: "",
  cartInfo: [],
  shipingAddress: null,
};

// Async actions
// add => fetch the data with id and add the qty to it
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { id, qty }: { id: string; qty: number },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(`/api/a1/products/${id}`);

      const dataWithQty = { ...data };
      dataWithQty.qty = qty;

      const {
        cart: { cartInfo },
      } = getState() as RootState;
      //   console.log(dataWithQty);
      localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
      return dataWithQty;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// remove
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async ({id}:{id:string},{dispatch,rejectWithValue,getState}) => {

//   }
// );
// save shipping address in local
// save payment method

// createSlice
export const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    removeFromCart: (state, { payload }: PayloadAction<{ id: string }>) => {
      const index = state.cartInfo.findIndex(
        (cartItem) => cartItem._id === payload.id
      );
      if (index !== -1) {
        state.cartInfo.splice(index, 1);
        localStorage.setItem("cartInfo", JSON.stringify(state.cartInfo));
      }
    },
    saveShipingAddress: (
      state,
      {
        payload,
      }: PayloadAction<{
        address: string;
        city: string;
        plz: string;
        country: string;
      }>
    ) => {
      state.shipingAddress = payload;
      localStorage.setItem(
        "shipingAddress",
        JSON.stringify(state.shipingAddress)
      );
    },
    clearShoppingAddress: (state) => {
      state.shipingAddress = null;
      localStorage.removeItem("shipingAddress");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      const item = payload;
      //   checking for item

      //   const alreadyInCart = state.cartInfo.find((alreadyIn) => {
      //     console.log(alreadyIn);
      //     console.log(item);
      //     return alreadyIn._id === item._id;
      //   });
      //   console.log(alreadyInCart);
      //   if (!alreadyInCart) {
      // }
      const valueIn = state.cartInfo.some((x) => x._id === item._id);
      if (valueIn) {
        console.log("schon drin");
        state.cartInfo = state.cartInfo?.map((x) =>
          x._id === item._id ? item : x
        );
      } else {
        console.log("eingefügt");
        state.cartInfo?.push(item);
      }
    });
    builder.addCase(addToCart.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const {
  removeFromCart,
  saveShipingAddress,
  clearShoppingAddress,
} = cartSlice.actions;
