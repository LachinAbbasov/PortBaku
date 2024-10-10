import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload); // Yeni məhsulu əlavə et
    },
    setProducts: (state, action) => {
      return action.payload; // Backend-dən gələn bütün məhsulları state-ə əlavə et
    },
  },
});

export const { addProduct, setProducts } = productSlice.actions; // `setProducts`-i ixrac edin
export const selectProducts = (state) => state.products; // Məhsulları seçmək üçün selektor

export default productSlice.reducer; // Reducer-i ixrac et
