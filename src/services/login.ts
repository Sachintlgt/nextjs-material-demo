import { postRequest } from "./api"

// login service
export const loginService = (data: any) => {
    return postRequest('https://dummyjson.com/auth/login', JSON.stringify(data));
}