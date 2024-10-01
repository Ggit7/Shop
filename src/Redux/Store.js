import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./CartSlice";

export const Store = configureStore({
  reducer: {
    productstore: cartSlice.reducer
  },
});
