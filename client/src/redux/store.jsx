import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice'; // Örnek olarak

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
