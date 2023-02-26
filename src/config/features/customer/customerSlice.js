import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/index";

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async ({ values, toast }) => {
    try {
      const result = await api.post("/address", values);
      toast.success(result.data.message);
      return result.data.message;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllAddress = createAsyncThunk(
  "address/getAllAddress",
  async (idCustomer) => {
    try {
      const result = await api.get(`/address/${idCustomer}`);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const setPrimaryAddress = createAsyncThunk(
  "address/setPrimaryAddress",
  async ({ data, toast, setLoading }) => {
    try {
      const result = await api.post(`/address/chose-address`, data);
      toast.success(result.data.message);
      setLoading(false);
      return result.data.message;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
);

export const getAddressPrimary = createAsyncThunk(
  "address/getAddressPrimary",
  async (id) => {
    try {
      const result = await api.get(`/address/primary/${id}`);
      return result.data.data[0];
    } catch (error) {
      console.log(error);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    addMessage: "",
    myAddress: [],
    choseMessage: "",
    primary: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.addMessage = action.payload;
    });
    builder.addCase(getAllAddress.fulfilled, (state, action) => {
      state.myAddress = action.payload;
    });
    builder.addCase(setPrimaryAddress.fulfilled, (state, action) => {
      state.choseMessage = action.payload;
    });
    builder.addCase(getAddressPrimary.fulfilled, (state, action) => {
      state.primary = action.payload;
    });
  },
});

export default customerSlice.reducer;
