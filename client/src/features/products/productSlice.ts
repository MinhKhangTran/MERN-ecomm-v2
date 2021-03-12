import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { toastError, toastSuccess } from "../toast/toastSlice";

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
  änderung: boolean;
}
// initState
const initState: IInitState = {
  loading: false,
  error: "",
  productInfo: null,
  singleProduct: null,
  änderung: false,
};

// async Actions
// Get all Products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/a1/products");
      // console.log(data);
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
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
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// ======================ADMIN======================
// Delete Product by ID
export const deleteProductById = createAsyncThunk(
  "products/deleteProductById",
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

      const { data } = await axios.delete(`/api/a1/products/${id}`, config);
      dispatch(toastSuccess("Produkt wurde gelöscht!"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// create product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (
    {
      name,
      price,
      image,
      brand,
      desc,
      category,
      countInStock,
      numReviews,
      rating,
    }: {
      name: string;
      price: number;
      image: string;
      brand: string;
      desc: string;
      category: string;
      countInStock: number;
      numReviews: number;
      rating: number;
    },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const {
        users: { userInfo },
      } = getState() as RootState;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/a1/products`,
        {
          name,
          price,
          image,
          brand,
          desc,
          category,
          countInStock,
          numReviews,
          rating,
        },
        config
      );
      dispatch(toastSuccess("Produk wurde hinzugefügt!"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);
// update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    {
      name,
      price,
      image,
      brand,
      desc,
      category,
      countInStock,
      numReviews,
      rating,
      id,
    }: {
      name: string;
      price: number;
      image: string;
      brand: string;
      desc: string;
      category: string;
      countInStock: number;
      numReviews: number;
      rating: number;
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
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/a1/products/${id}`,
        {
          name,
          price,
          image,
          brand,
          desc,
          category,
          countInStock,
          numReviews,
          rating,
        },
        config
      );
      console.log(data);
      dispatch(toastSuccess("Produkt wurde geändert!"));
      return data;
    } catch (error) {
      // toast
      dispatch(toastError(error.response.data.message));
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Slice
export const productSlice = createSlice({
  name: "products",
  initialState: initState,
  reducers: {
    clearProductÄnderung: (state) => {
      state.änderung = false;
    },
  },
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
    // ======================ADMIN======================
    // Delete a product by id
    builder.addCase(deleteProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProductById.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.änderung = true;
    });
    builder.addCase(deleteProductById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // create a product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      if (state.productInfo !== null) {
        state.productInfo.push = payload;
      }
    });
    builder.addCase(createProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // Delete a product by id
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.änderung = true;
    });
    builder.addCase(updateProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { clearProductÄnderung } = productSlice.actions;
