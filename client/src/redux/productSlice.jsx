import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await axios.get('http://localhost:5000/api/mehsullar');
  return response.data;
});

// Async thunk to update a product
export const updateProduct = createAsyncThunk('product/updateProduct', async (updatedProduct) => {
  const { _id, ...updates } = updatedProduct;
  const response = await axios.patch(`http://localhost:5000/api/mehsullar/${_id}`, updates);
  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
    branches: [],  // Filtre için branch
    categories: [],  // Filtre için kategori
    selectedBranch: '',  // Seçilen branch
    selectedCategory: '',  // Seçilen kategori
    filteredProducts: [],  // Filtrelenmiş ürünler
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

        // Branch ve Kategori set et
        const uniqueBranches = [...new Set(action.payload.map((product) => product.branchName))];
        const uniqueCategories = [...new Set(action.payload.flatMap((product) => product.category))];
        state.branches = uniqueBranches;
        state.categories = uniqueCategories;
        state.filteredProducts = action.payload;  // İlk başta tüm ürünler
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        // Güncellenmiş ürünü state'teki ürünler listesinde bul ve güncelle
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
          productSlice.caseReducers.filterProducts(state); // Filtreleri yeniden uygula
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setBranch, setCategory } = productSlice.actions;

export default productSlice.reducer;
