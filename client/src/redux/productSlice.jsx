import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload); // Yeni məhsulu əlavə et
    },
  },
});

export const { addProduct } = productSlice.actions;
export const selectProducts = (state) => state.products; // Məhsulları seçmək üçün selektor

export default productSlice.reducer; // Reducer-i ixrac et
