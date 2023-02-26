import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/index";

export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async () => {
    try {
      const result = await api.get("/categories");
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getById",
  async (id) => {
    try {
      const result = await api.get(`/categories/${id}`);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    byId: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.byId = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
