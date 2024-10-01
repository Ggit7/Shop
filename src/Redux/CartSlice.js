import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./Helper";

const initialState = {
  status: "idle",
  allitem: [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  totalPrice: JSON.parse(localStorage.getItem("total")) || 0
};

export const product = createAsyncThunk("/all", async () => {
  const res = await axiosInstance.get("/products");
  return res?.data;
});

const updateLocalStorage = (cart, totalPrice) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", JSON.stringify(totalPrice));
};

export const cartSlice = createSlice({
  name: "cartproject",
  initialState,
  reducers: {
    additem: (state, action) => {
      const { id, title, price, image } = action.payload;

      const existingItem = state.cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.updateprice = existingItem.price * existingItem.quantity;
      } else {
        const newProduct = {
          id,
          title,
          price,
          updateprice: price,
          image,
          quantity: 1
        };
        state.cart.push(newProduct);
      }

      state.totalPrice += price;
      updateLocalStorage(state.cart, state.totalPrice);
    },

    incrementQnty: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.map(item => {
        if (item.id === itemId) {
          item.quantity += 1;
          item.updateprice = item.price * item.quantity;
        }
        return item;
      });

      state.totalPrice = state.cart.reduce((total, item) => total + item.updateprice, 0);
      updateLocalStorage(state.cart, state.totalPrice);
    },

    decrementQnty: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.map(item => {
        if (item.id === itemId) {
          item.quantity = Math.max(item.quantity - 1, 0); // Prevent negative quantity
          item.updateprice = item.price * item.quantity;
        }
        return item;
      });

      state.totalPrice = state.cart.reduce((total, item) => total + item.updateprice, 0);
      updateLocalStorage(state.cart, state.totalPrice);
    },

    deleteitem: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter(item => item.id !== itemId);
      state.totalPrice = state.cart.reduce((total, item) => total + item.updateprice, 0);
      updateLocalStorage(state.cart, state.totalPrice);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(product.pending, (state) => {
        state.status = "loading";
      })
      .addCase(product.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.allitem = payload;
      })
      .addCase(product.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export const { additem, incrementQnty, deleteitem, decrementQnty } = cartSlice.actions;
export default cartSlice.reducer;
