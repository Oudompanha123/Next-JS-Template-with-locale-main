import { http } from "@/utils/http";
import { ApiResponse } from "@/types/common/api-response";

const SERVICE_ID = {
    GET_USER: "api/user",
}

const getUser = async () => {
    const response = await http.get<ApiResponse<any>>(SERVICE_ID.GET_USER);
    return response.data;
}

export const userService = {
    getUser,
}
