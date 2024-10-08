import { createSlice } from '@reduxjs/toolkit';

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    data: [],
  },
  reducers: {
    setSalesData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSalesData } = salesSlice.actions;
export default salesSlice.reducer;
