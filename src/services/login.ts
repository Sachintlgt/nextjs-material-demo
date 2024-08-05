import { NEXT_PUBLIC_API_LOGIN_URL } from "@/constants/apis";
import { postRequest } from "./api"

// login service
export const loginService = (data: any) => {
    return postRequest(NEXT_PUBLIC_API_LOGIN_URL, JSON.stringify(data));
}