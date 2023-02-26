import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async ({ data, onClose, toast, setLoading }) => {
    try {
      const result = await api.post(`/orders`, data);
      onClose();
      toast.success(result.data.message);
      setLoading(false);
      return result.data.message;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
);
export const getOrder = createAsyncThunk("order/getOrder", async (id) => {
  try {
    const result = await api.get(`orders/${id}?deliverystatus=pending`);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    message: "",
    items: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default orderSlice.reducer;
