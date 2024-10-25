// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Filialları fetch et
export const fetchBranches = createAsyncThunk('products/fetchBranches', async () => {
  const response = await axios.get('/api/branches');
  return response.data;
});

// Kategoriyaları fetch et
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get('/api/categories');
  return response.data;
});

// Məhsulları fetch et
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/api/products');
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    branches: [],
    categories: [],
    products: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.branches = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export default productSlice.reducer;
