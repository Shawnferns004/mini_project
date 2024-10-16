import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from './admin-slice'
import shopProductSlice from './shop-slice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts : adminProductSlice,
    shopProducts : shopProductSlice,

  },
});

export default store;
