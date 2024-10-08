import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/index";

export const registerSeller = createAsyncThunk("seller/register", async ({ values, navigate, toast, setLoading }) => {
  try {
    const result = await api.post("/users/auth/register", values);
    toast.success(result.data.message);
    setTimeout(() => {
      navigate("/login");
    }, 2500);
    setLoading(false);
    return result.data.message;
  } catch (error) {
    setLoading(false);
    toast.error(error.response.data.message);
  }
});
export const loginSeller = createAsyncThunk("seller/login", async ({ values, navigate, toast, setLoading }) => {
  try {
    const result = await api.post("/users/auth/login", values);
    localStorage.setItem("access", result.data.data.access_token);
    localStorage.setItem("refresh", result.data.data.refresh_token);
    localStorage.setItem("role", "seller");
    toast.success(result.data.message);
    setTimeout(() => {
      navigate("/");
    }, 2500);
    setLoading(false);
    const payload = {
      message: result.data.message,
      role: result.data.data.role,
    };
    return payload;
  } catch (error) {
    setLoading(false);
    toast.error(error.response.data.message);
  }
});

// customer
export const registerCustomer = createAsyncThunk("customer/register", async ({ customer, navigate, toast, setLoading }) => {
  try {
    const result = await api.post("/users/auth/register", customer);
    console.log(result);
    toast.success(result.data.message);
    setTimeout(() => {
      navigate("/login");
    }, 2500);
    setLoading(false);
    return result.data.message;
  } catch (error) {
    setLoading(false);
    toast.error(error.response.data.message);
  }
});
export const loginCustomer = createAsyncThunk("customer/login", async ({ values, navigate, toast, setLoading }) => {
  try {
    const result = await api.post("/users/auth/login", values);
    localStorage.setItem("access", result.data.data.access_token);
    localStorage.setItem("refresh", result.data.data.refresh_token);
    localStorage.setItem("role", "customer");
    toast.success(result.data.message);
    setTimeout(() => {
      navigate("/");
    }, 2500);
    setLoading(false);
    return result.data.message;
  } catch (error) {
    setLoading(false);
    toast.error(error.response.data.message);
  }
});

// getProfile
export const getSeller = createAsyncThunk("seller/getById", async (id) => {
  try {
    const token = localStorage.getItem('access'); // Ambil token dari localStorage
    const result = await api.get(`/users/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
      },
    });
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
});
export const getCustomer = createAsyncThunk("customer/getById", async (id) => {
  try {
    const token = localStorage.getItem("access");
    const result = await api.get(`/users/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
});

// editProfile
export const editSeller = createAsyncThunk("seller/edit", async ({ id, formData, setLoading, toast }) => {
  try {
    const token = localStorage.getItem("access");
    const result = await api.put(`/users/profile/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(result.data.message);
    setLoading(false);
    return result.data.message;
  } catch (error) {
    setLoading(false);
    toast.error(error.response.data.message);
  }
});
export const editCustomer = createAsyncThunk("customer/edit", async ({ id, formData, setLoading, toast }) => {
  try {
    const token = localStorage.getItem("access");
    const result = await api.put(`/users/profile/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(result.data.message);
    setLoading(false);
    return result.data.message;
  } catch (error) {
    setLoading(false);
    toast.error(error.response.data.message);
    // console.log(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    message: "",
    seller: [],
    updateSeller: "",
    customer: [],
    updateCustomer: "",
  },
  extraReducers: (builder) => {
    builder.addCase(registerSeller.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(loginSeller.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.role = action.payload.role;
    });
    builder.addCase(registerCustomer.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(loginCustomer.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(getSeller.fulfilled, (state, action) => {
      state.seller = action.payload;
    });
    builder.addCase(editSeller.fulfilled, (state, action) => {
      state.updateSeller = action.payload;
    });
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.customer = action.payload;
    });
    builder.addCase(editCustomer.fulfilled, (state, action) => {
      state.updateCustomer = action.payload;
    });
  },
});

export default authSlice.reducer;
