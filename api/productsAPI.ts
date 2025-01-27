import { setIsLoading, setProducts, } from "../redux/productsSlice";

export const fetchProducts = async (token: string, dispatch: any) => {
    try {
        dispatch(setIsLoading(true));

        const response = await fetch("https://fakestoreapi.com/products", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        dispatch(setProducts(data));
    } catch (error) {
        console.error("Error fetching products:", error);
    } finally {
        dispatch(setIsLoading(false));
    }
};
