import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/index";

export const getNewProduct = createAsyncThunk("products/getNew", async () => {
  try {
    const result = await api.get("/products/new");
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
});
export const getAllProduct = createAsyncThunk("product/getAll", async () => {
  try {
    const result = await api.get(`/products/popular`);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
});
export const getSearch = createAsyncThunk("product/getSearch", async ({ searchParams, setData, setTotalPage, currentPage, setLoading, price }) => {
  try {
    let query = `/products/search?${searchParams}&page=${currentPage}`;
    if (price) {
      let sort = null;
      if(price === 'cheap'){
        sort ='asc'
      } else if(price === 'expensive'){
        sort = 'desc'
      }
      query += `&price=${sort}`;
    }

    const result = await api.get(query);
    setTotalPage(result.data.totalPages);
    setData(result.data.data);
    setLoading(false)
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
});
// my product
export const getMyProduct = createAsyncThunk("product/getMyProduct", async ({ id, search }) => {
  try {
    const token = localStorage.getItem("access"); // Ambil token dari localStorage
    const result = await api.get(`/products/seller`, {
      headers: {
        Authorization: `Bearer ${token}`, // Tambahkan header Authorization
      },
    });
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
});

// add product
export const addProduct = createAsyncThunk("product/add", async ({ formData, setLoading, toast }) => {
  try {
    const token = localStorage.getItem('access')
    const result = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
    });
    setLoading(false);
    toast.success(result.data.message);
    const response = result.data.data;
    return response
  } catch (error) {
    toast.error(error.response.message);
    setLoading(false);
    console.log(error);
  }
});
// detail product
export const getProductById = createAsyncThunk("product/getProductById", async ({ id, setLoading, setIdCategory }) => {
  try {
    const result = await api.get(`/products/${id}`);
    setLoading(false);
    setIdCategory(result.data.data.category_id);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
});
// recent product
export const getProductByIdCategory = createAsyncThunk("product/getProductByIdCategory", async ({ idCategory, setLoading }) => {
  try {
    const result = await api.get(`/products/recents/${idCategory}`);
    setLoading(false);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const removeProduct = createAsyncThunk("product/removeProduct", async ({ id, setLoading, toast }) => {
  try {
    const token = localStorage.getItem('access')
    const result = await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setLoading(false);
    toast.success(result.data.message);
    return result.data.message;
  } catch (error) {
    setLoading(false);
    toast.error(error.response.message);
    console.log(error);
  }
});

export const editProduct = createAsyncThunk("product/editProduct", async ({ id, setLoading, toast, formData }) => {
  try {
    const result = await api.put(`/product/edit/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLoading(false);
    console.log(result);
    toast.success(result.data.message);
    return result.data.message;
  } catch (error) {
    setLoading(false);
    toast.error(error.response.message);
    console.log(error);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    all: [],
    addProduct: "",
    myProducts: [],
    item: [],
    recent: [],
    message: "",
    searchItems: [],
    editMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getNewProduct.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.all = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.add = action.payload;
    });
    builder.addCase(getMyProduct.fulfilled, (state, action) => {
      state.myProducts = action.payload;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.item = action.payload;
    });
    builder.addCase(getProductByIdCategory.fulfilled, (state, action) => {
      state.recent = action.payload;
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(getSearch.fulfilled, (state, action) => {
      state.searchItems = action.payload;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.editMessage = action.payload;
    });
  },
});

export default productSlice.reducer;
