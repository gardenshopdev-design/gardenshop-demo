import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3333"
    : "https://gardenshop-backend.onrender.com");

// Asynchronous action for loading products from the server
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/products/all`);
      if (!response.ok) {
        throw new Error("Error loading products");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
    sortBy: "default",
    onlyDiscounted: false,
    minPrice: 0,
    maxPrice: Infinity,
  },
  reducers: {
    
    sortByPriceAsc: (state) => {
      state.filteredProducts = [...state.filteredProducts].sort((a, b) => {
        const priceA = a.discont_price ?? a.price;
        const priceB = b.discont_price ?? b.price;
        return priceA - priceB;
      });
      state.sortBy = "asc";
    },

    sortByPriceDesc: (state) => {
      state.filteredProducts = [...state.filteredProducts].sort((a, b) => {
        const priceA = a.discont_price ?? a.price;
        const priceB = b.discont_price ?? b.price;
        return priceB - priceA;
      });
      state.sortBy = "desc";
    },

    resetSort: (state) => {
      state.filteredProducts = [...state.products];
    },

    filterByPrice: (state, action) => {
      const { minPrice, maxPrice } = action.payload;
      state.filteredProducts = state.filteredProducts.filter((product) => {
        const price = product.discont_price ?? product.price;
        return price >= minPrice && price <= maxPrice;
      });
    },

    filterDiscounted: (state) => {
      state.filteredProducts = state.filteredProducts.filter(
        (product) => product.discont_price !== null
      );
    },

    sortByDiscountDesc: (state) => {
      state.filteredProducts = [...state.filteredProducts].sort((a, b) => {
        const discountA =
          a.discont_price !== null && a.discont_price !== undefined
            ? (a.price - a.discont_price) / a.price
            : 0;
        const discountB =
          b.discont_price !== null && b.discont_price !== undefined
            ? (b.price - b.discont_price) / b.price
            : 0;
        return discountB - discountA;
      });
      state.sortBy = "discountDesc";
    },

    sortByTitleAsc: (state) => {
      state.sortBy = "titleAsc";
      state.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    },

    sortByTitleDesc: (state) => {
      state.sortBy = "titleDesc";
      state.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setProducts,
  sortByPriceAsc,
  sortByPriceDesc,
  resetSort,
  filterByPrice,
  filterDiscounted,
  sortByTitleAsc,
  sortByTitleDesc,
  sortByDiscountDesc,
} = productsSlice.actions;

export default productsSlice.reducer;
