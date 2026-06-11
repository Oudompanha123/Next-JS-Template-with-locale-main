import http from "@/libs/http";
import { ApiResponse } from "@/types/common/api-response";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/login/login.type";

const SERVICE_ID = {
    LOGIN: "auth/login",
    REGISTER: "auth/register",
}

const login = async (data: LoginRequest) => {
    const response = await http.post<ApiResponse<LoginResponse>>(SERVICE_ID.LOGIN, data);
    return response.data;
}

const register = async (data: RegisterRequest) => {
    const response = await http.post<ApiResponse<RegisterResponse>>(SERVICE_ID.REGISTER, data);
    return response.data;
}

export const loginService = {
    login,
    register,
}