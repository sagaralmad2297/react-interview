import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories } from '../redux/productService'; 

const initialState = {
  products: [],
  categories: [],
  selectedCategory: 'All',  
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};


export const fetchProductsThunk = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, page }) => {
    const data = await fetchProducts(category, page);
    return data;  
  }
);

export const fetchCategoriesThunk = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const data = await fetchCategories();
    return data;  
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory, setPage } = productSlice.actions;

export default productSlice.reducer;



