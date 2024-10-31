import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Axios instance oluşturma ve interceptor ile Authorization header ekleme
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tüm ürünleri çekme
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await axiosInstance.get('/mehsullar');
  return response.data;
});

// Kategoriye göre ürünleri çekme
export const fetchProductsByCategory = createAsyncThunk('product/fetchProductsByCategory', async (category) => {
  const response = await axiosInstance.get(`/mehsullar?category=${category}`);
  return response.data;
});

// Ürünü güncelleme
export const updateProduct = createAsyncThunk('product/updateProduct', async (updatedProduct) => {
  const { _id, ...updates } = updatedProduct;
  const response = await axiosInstance.patch(`/mehsullar/${_id}`, updates);
  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
    branches: [],
    categories: [],
    selectedBranch: '',
    selectedCategory: '',
    filteredProducts: [],
  },
  reducers: {
    setBranch(state, action) {
      state.selectedBranch = action.payload;
      productSlice.caseReducers.filterProducts(state);
    },
    setCategory(state, action) {
      state.selectedCategory = action.payload;
      productSlice.caseReducers.filterProducts(state);
    },
    filterProducts(state) {
      const { products, selectedBranch, selectedCategory } = state;
      state.filteredProducts = products.filter((product) => {
        const branchMatch = selectedBranch ? product.branchName === selectedBranch : true;
        const categoryMatch = selectedCategory ? product.category.includes(selectedCategory) : true;
        return branchMatch && categoryMatch;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;

        // Şubeleri ve kategorileri ayarlayın
        const uniqueBranches = [...new Set(action.payload.map((product) => product.branchName))];
        const uniqueCategories = [...new Set(action.payload.flatMap((product) => product.category))];
        state.branches = uniqueBranches;
        state.categories = uniqueCategories;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filteredProducts = action.payload; // Sadece seçilen kategorinin ürünlerini göster
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
          productSlice.caseReducers.filterProducts(state);
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setBranch, setCategory } = productSlice.actions;

export default productSlice.reducer;
