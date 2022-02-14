import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarHidden: false,
};

const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    showSidebar(state) {
      state.isSidebarHidden = false;
    },
    hideSidebar(state) {
      state.isSidebarHidden = true;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
