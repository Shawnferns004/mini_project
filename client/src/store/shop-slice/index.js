import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




const initialState = {
    isLoading : false,
    productList :[]
}


export const fetchAllFilterProducts = createAsyncThunk(
    '/products/fetchAllFilterProducts',
    async ({ filterParams, sortParams }) => {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      }).toString(); // Convert to string
  
      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get?${query}`
      );
  
      return result?.data;
    }
  );



const shopProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState,
    reducers:{},
    extraReducers :(builder) =>{
        builder
        .addCase(fetchAllFilterProducts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchAllFilterProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload.data || action.payload; // Adjust based on the response
        })
        .addCase(fetchAllFilterProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = [];
        })
    }
})

export default shopProductSlice.reducer;