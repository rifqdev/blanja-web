import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/index";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ data, setLoading, toast }) => {
    try {
      const result = await api.post(`/cart/add`, data);
      setLoading(false);
      toast.success(result.data.message);
      return result.data.message;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getCart = createAsyncThunk("cart/getCart", async (id) => {
  try {
    const result = await api.get(`/cart/${id}`);

    return result.data.data;
  } catch (error) {
    console.log(error);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    message: "",
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default cartSlice.reducer;
