import http from "@/utils/http";
import { ApiResponse } from "@/types/common/api-response";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/auth";
import { findMockUser } from "./mock-users";

const SERVICE_ID = {
    LOGIN: "auth/login",
    REGISTER: "auth/register",
}

// Hard-blocked in production so a stray MOCK_AUTH=true in an env file can never
// grant access using the placeholder credentials in mock-users.ts.
const isMockAuthEnabled = () =>
    process.env.MOCK_AUTH === "true" && process.env.NODE_ENV !== "production";

const login = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    if (isMockAuthEnabled()) {
        const mockUser = findMockUser(data.username, data.password);
        if (mockUser) {
            return {
                status: { code: 200, message: "OK (mock)" },
                data: {
                    accessToken: `mock-access-token-${mockUser.userId}`,
                    refreshToken: `mock-refresh-token-${mockUser.userId}`,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    userInfo: {
                        userId: mockUser.userId,
                        usernam: mockUser.username,
                        email: mockUser.email,
                        fullName: mockUser.fullName,
                        role: mockUser.role,
                    },
                },
            };
        }
    }

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