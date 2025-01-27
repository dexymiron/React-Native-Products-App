export const fetchProductsFromApi = async (token: string) => {
    const response = await fetch("https://fakestoreapi.com/products", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};