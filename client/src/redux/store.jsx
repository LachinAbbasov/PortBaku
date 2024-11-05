import { configureStore } from '@reduxjs/toolkit';  // @reduxjs/toolkit'ten sadece configureStore'u getiriyoruz
import productReducer from './productSlice'; // Örnek olarak
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// persistConfig'i tanımlıyoruz
const persistConfig = {
  key: 'root',
  storage,
};

// productReducer'ı persistent hale getiriyoruz
const persistedProductReducer = persistReducer(persistConfig, productReducer);

const store = configureStore({
  reducer: {
    product: persistedProductReducer,  // product reducer'ı persisted hale getirdik
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Non-serializable kontrolünü kapatıyoruz
    }),
  
});

export const persistor = persistStore(store);  // persistor'ı oluşturduk
export default store;