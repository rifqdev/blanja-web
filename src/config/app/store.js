import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import categoriesSlice from "../features/categories/categoriesSlice";
import productSlice from "../features/product/productSlice";
import CartSlice from "../features/cart/CartSlice";
import customerSlice from "../features/customer/customerSlice";
import orderSlice from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    categories: categoriesSlice,
    product: productSlice,
    cart: CartSlice,
    customer: customerSlice,
    order: orderSlice,
  },
});
