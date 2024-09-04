import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/index";

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async ({ values, toast }) => {
    try {
      const token = localStorage.getItem('access'); // Ambil token dari localStorage
      const result = await api.post("/address", values, {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
        },
      });
      toast.success(result.data.message);
      return result.data.message;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllAddress = createAsyncThunk(
  "address/getAllAddress",
  async () => {
    try {
      const token = localStorage.getItem('access'); // Ambil token dari localStorage
      const result = await api.get('/address', {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
        },
      });
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const setPrimaryAddress = createAsyncThunk(
  "address/setPrimaryAddress",
  async ({ data, toast, setLoading, id }) => {
    try {
      const token = localStorage.getItem('access'); // Ambil token dari localStorage
      const result = await api.put(`/address/primary/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
        },
      });
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
  async () => {
    try {
      const token = localStorage.getItem('access'); // Get the token from localStorage
      const result = await api.get('/address/primary', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      return result.data.data;
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
