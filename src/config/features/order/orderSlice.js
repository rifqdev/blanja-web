import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async ({ data, onClose, toast, setLoading }) => {
    try {
      const token = localStorage.getItem('access'); // Ambil token dari localStorage
      const result = await api.post(`/order`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
        },
      });
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

export const getOrder = createAsyncThunk("order/getOrder", async (status) => {
  try {
    const token = localStorage.getItem('access'); // Ambil token dari localStorage
    const result = await api.get(`order/custommer`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
      },
    });
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
