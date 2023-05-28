import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggleSnackbar: false,
  snackbarMessage: null,
  type: 'success'
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    toggleSnackbarOpen: (state, action) => {
      state.toggleSnackbar = true;
      state.snackbarMessage = action.payload;
    },
    toggleSnackbarClose: (state) => {
      state.toggleSnackbar = false;
      state.snackbarMessage = null;
    },
    setType: (state, action) => {
      state.type = action.payload;
    }
  }
});

export const { toggleSnackbarOpen, toggleSnackbarClose, setType } = snackbarSlice.actions;

export default snackbarSlice.reducer;
