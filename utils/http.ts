import axios from "axios";
import { getSession, signOut } from "next-auth/react";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

http.interceptors.request.use(async (request) => {
  const userSession = await getSession();
  if (!userSession) return request;

  request.headers.Authorization = `Bearer ${userSession.token}`;
  return request;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error?.response;
    if (!response) {
      return Promise.reject(error);
    }

    const data = response.data;
    const message = (data && data.message) || response.statusText || data?.status?.message;

    if (response.status === 401) {
      signOut();
      return Promise.reject({ message, status: response.status });
    }

    return Promise.reject({
      message,
      status: response.status,
      code: data?.status?.code || response.status,
      data: data?.data,
    });
  }
);
