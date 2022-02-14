import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui';

const store = configureStore({
  reducer: { ui: uiReducer },
});

export default store;
