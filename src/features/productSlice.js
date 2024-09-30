// src/features/productSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;
export const selectProducts = (state) => state.products.items;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await axios.get('https://dummyjson.com/products');
    dispatch(fetchProductsSuccess(response.data.products));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export default productSlice.reducer;
