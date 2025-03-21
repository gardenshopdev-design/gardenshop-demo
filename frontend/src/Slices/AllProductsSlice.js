import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Асинхронный экшен для загрузки продуктов с сервера
export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch("http://localhost:3333/products/all");
			if (!response.ok) {
				throw new Error("Ошибка при загрузке товаров");
			}
			const data = await response.json();
			// console.log(data);

			return data;
		} catch (error) {
			return rejectWithValue(error.message);
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
			state.filteredProducts = [...state.products]; // Сброс к оригинальному массиву
			//state.sortBy = "default";
		},

		filterByPrice: (state, action) => {
			// console.log('filter by price');
			// console.log(state.minPrice, state.maxPrice);
			
			const { minPrice, maxPrice } = action.payload;
			// console.log(minPrice, maxPrice);
			state.filteredProducts = state.filteredProducts.filter((product) => {
				const price = product.discont_price ?? product.price;
				return price >= minPrice && price <= maxPrice;
			});
			//console.log(state.filteredProducts);
			
		},

		filterDiscounted: (state) => {
			state.filteredProducts = state.filteredProducts.filter(
				(product) => product.discont_price !== null
			);
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
} = productsSlice.actions;
export default productsSlice.reducer;
