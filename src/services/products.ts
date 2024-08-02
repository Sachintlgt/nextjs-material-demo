import { getRequest } from "./api"

export const getProducts = () => {
    return getRequest('https://dummyjson.com/products');
}

export const getProduct = (id: number) => {
    return getRequest(`https://dummyjson.com/product/${id}`);
}