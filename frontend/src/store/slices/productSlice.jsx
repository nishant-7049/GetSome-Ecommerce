import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("products/get", async (object) => {
  if (!object.keyword) {
    object.keyword = "";
  }

  if (!object.currPage) {
    object.currPage = 1;
  }

  let link = `/api/product?keyword=${object.keyword}&page=${object.currPage}&price[gte]=${object.price[0]}&price[lte]=${object.price[1]}&ratings[gte]=${object.ratings}&category=${object.category}`;

  if (!object.category || object.category == "All") {
    link = `/api/product?keyword=${object.keyword}&page=${object.currPage}&price[gte]=${object.price[0]}&price[lte]=${object.price[1]}&ratings[gte]=${object.ratings}`;
  }
  const data = await axios.get(link);
  return data.data;
});

export const getAdminProducts = createAsyncThunk(
  "getAdminProducts",
  async () => {
    const { data } = await axios.get("/api/admin/products");
    return data.products;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: true,
    productsCount: 0,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.product;
      state.productsCount = action.payload.productsCount;
      state.productPerPage = action.payload.productPerPage;
      state.filteredProductCount = action.payload.filteredProductCount;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAdminProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.productsCount = action.payload.length;
    });
    builder.addCase(getAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
