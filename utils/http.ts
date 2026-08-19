import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

http.interceptors.request.use(async (request) => {
  // Prefer NextAuth session token if available (client-side)
  if (typeof window !== "undefined") {
    try {
      const { getSession } = await import("next-auth/react");
      const session = await getSession();
      const accessToken = (session as unknown as Record<string, unknown>)
        ?.accessToken as string | undefined;
      if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (_) {
      // swallow
    }
  }
  try {
    request.headers["X-Timezone"] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (_) {
    // no-op
  }
  return request;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const response = error?.response;
    if (!response) {
      return Promise.reject(error);
    }
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        try {
          const { signOut } = await import("next-auth/react");
          await signOut({ callbackUrl: "/login" });
        } catch (_) {
          window.location.href = "/login";
        }
      }
      return Promise.reject({
        message: "Unauthorized access. Please log in again.",
        status: response.status,
      });
    }
    const data = response?.data;
    const errMessage =
      (data && (data.message || data?.status?.message)) || response.statusText;
    return Promise.reject({
      message: errMessage,
      data: data?.data,
      status: response.status,
    });
  }
);

export default http;
