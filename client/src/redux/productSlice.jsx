import { createSlice } from '@reduxjs/toolkit';
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    branchName: '',
    startDate: '',
    endDate: '',
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload); // Yeni məhsulu əlavə et
    },
    setProducts: (state, action) => {
      state.products = action.payload; // Backend-dən gələn bütün məhsulları state-ə əlavə et
    },
    setBranchName: (state, action) => {
      state.branchName = action.payload; // Filial adını güncəllə
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload; // Başlanğıc tarixini güncəllə
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload; // Bitiş tarixini güncəllə
    },
  },
});

// Eylemleri ve seçicileri dışa aktar
export const { addProduct, setProducts, setBranchName, setStartDate, setEndDate } = productSlice.actions;
export const selectProducts = (state) => state.products.products;
export const selectBranchName = (state) => state.products.branchName;
export const selectStartDate = (state) => state.products.startDate;
export const selectEndDate = (state) => state.products.endDate;

export default productSlice.reducer; // Reducer-i ixrac et
