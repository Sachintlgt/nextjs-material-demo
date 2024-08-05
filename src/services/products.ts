import { NEXT_PUBLIC_API_PRODUCTS_URL, NEXT_PUBLIC_API_PRODUCT_URL } from "@/constants/apis";
import { getRequest } from "./api"

export const getProducts = () => {
    return getRequest(NEXT_PUBLIC_API_PRODUCTS_URL);
}

export const getProduct = (id: number) => {
    return getRequest(`${NEXT_PUBLIC_API_PRODUCT_URL}/${id}`);
}