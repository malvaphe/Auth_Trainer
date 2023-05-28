import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import snackbarSlice from './snackbarSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarSlice
  }
});
