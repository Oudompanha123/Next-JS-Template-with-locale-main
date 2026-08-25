import { AuthRequest, RegisterRequest, RegisterResponse } from "@/types/auth";
import { http } from "@/utils/http";
import { API_ENDPOINTS } from "@/utils/endpoints";
import { generateRequestId } from "@/utils/request-id-generator";
import { findMockUser, createMockLoginResponse } from "./mock-users";

// Hard-blocked in production so a stray MOCK_AUTH=true in an env file can never
// grant access using the placeholder credentials in mock-users.ts.
const isMockAuthEnabled = () =>
  process.env.MOCK_AUTH === "true" && process.env.NODE_ENV !== "production";

const login = async (data: AuthRequest) => {
  if (isMockAuthEnabled()) {
    const mockUser = findMockUser(data.user_id, data.password);
    if (!mockUser) {
      return Promise.reject({ message: "Invalid username or password", status: 401 });
    }
    return createMockLoginResponse(mockUser);
  }

  return http.post(API_ENDPOINTS.AUTH.LOGIN.url, data, {
    headers: {
      "X-Api-Id": API_ENDPOINTS.AUTH.LOGIN.id,
      "X-Request-Id": generateRequestId(API_ENDPOINTS.AUTH.LOGIN.id),
    },
  });
};

const register = async (data: RegisterRequest) => {
  const response = await http.post<{ data: RegisterResponse }>("auth/register", data);
  return response.data;
};

export const authService = {
  login,
  register,
};

export default authService;
