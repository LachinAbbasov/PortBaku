import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Filialları fetch etmək üçün async thunk
export const fetchBranches = createAsyncThunk(
  'branches/fetchBranches',
  async () => {
    const response = await axios.get('/api/branches');
    return response.data;
  }
);

const branchSlice = createSlice({
  name: 'branches',
  initialState: {
    branches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default branchSlice.reducer;
