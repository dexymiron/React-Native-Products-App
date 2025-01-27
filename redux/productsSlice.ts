import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchProductsFromApi } from "../api/productsAPI";

type Rating = {
    rate: string;
    count: string;
};

type Product = {
    id: string;
    title: string;
    image: string;
    price: string;
    description: string;
    category?: string;
    rating: Rating;
};

type ProductsState = {
    items: Product[];
    isLoading: boolean;
    error: string | null;
};

const initialState: ProductsState = {
    items: [],
    isLoading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk<Product[], string>(
    "products/fetchProducts",
    async (token, { rejectWithValue }) => {
        try {
            const data = await fetchProductsFromApi(token);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string | null;
            });
    },
});

export default productsSlice.reducer;
