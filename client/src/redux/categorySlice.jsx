import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Hər bir kateqoriya üçün uyğun endpointlər
const categoryEndpoints = {
  mayalilar: '/api/mehsullar/mayalilar',
  tortlar: '/api/mehsullar/tortlar',
  paxlavalar: '/api/mehsullar/paxlavalar',
  quruMallar: '/api/mehsullar/qurumallar',
  kulinariyalar: '/api/mehsullar/kulinariyalar',
  salatlar: '/api/mehsullar/salatlar',
  yemekler: '/api/mehsullar/yemekler',
};

// Seçilən kateqoriyaya uyğun məhsulları fetch edən async thunk
export const fetchCategoryProducts = createAsyncThunk(
  'categories/fetchCategoryProducts',
  async ({ selectedCategory, branchName }) => {
    const endpoint = categoryEndpoints[selectedCategory];
    const response = await axios.get(endpoint, { params: { branchName } });
    return response.data;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
