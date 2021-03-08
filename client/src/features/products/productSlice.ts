import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

// types
export interface IProducts {
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  _id: string;
  name: string;
  image: string;
  desc: string;
  brand: string;
  category: string;
  user: string;
  reviews: any[];
  createdAt: string;
}
interface IInitState {
  loading: boolean;
  error: any;
  productInfo: IProducts[] | null;
  singleProduct: IProducts | null;
}
// initState
const initState: IInitState = {
  loading: false,
  error: "",
  productInfo: null,
  singleProduct: null,
};

// async Actions
// Get all Products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/a1/products");
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
// get product by id
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async ({ id }: { id: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/a1/products/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Slice
export const productSlice = createSlice({
  name: "products",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all Products
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.productInfo = payload;
    });
    builder.addCase(getAllProducts.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // Get Product by Id
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.singleProduct = payload;
    });
    builder.addCase(getProductById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
