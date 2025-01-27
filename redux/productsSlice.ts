import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { fetchProductsFromApi } from "../api/productsAPI";

type Rating = {
    rate: string;
    count: string
}

type Product = {
    id: string;
    title: string;
    image: string;
    price: string;
    description: string;
    category?: string;
    rating: Rating
}

type ProductsState = {
    items: Product[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    isLoading: false,
    error: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.items = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setProducts, setIsLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;

export const fetchProducts = (token: string) => async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));

    try {
        const data = await fetchProductsFromApi(token);
        dispatch(setProducts(data));
    } catch (error: any) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setIsLoading(false));
    }
};