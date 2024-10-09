import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice'; // productSlice faylını import edin

const store = configureStore({
  reducer: {
    products: productReducer, // products adı ilə productSlice-i əlavə edin
  },
});

export default store;
