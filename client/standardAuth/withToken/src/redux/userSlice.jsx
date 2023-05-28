import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { set } = userSlice.actions;

export default userSlice.reducer;
