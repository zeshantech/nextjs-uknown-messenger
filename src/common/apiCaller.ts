import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const serverUrl = process.env.SERVER_URL! ?? "http://localhost:3000/api";

type Object = Record<string, any>;

export default async function apiCaller(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  body?: Object,
  query?: Object,
  headers?: Object
): Promise<ApiResponse> {
  try {
    const url = new URL(`${serverUrl}${endpoint}`);
    if (query) {
      Object.keys(query).forEach((key) =>
        url.searchParams.append(key, query[key])
      );
    }

    const config: AxiosRequestConfig = {
      method,
      url: url.toString(),
      headers: headers || {},
      data: body || {},
    };

    const { data } = await axios<ApiResponse>(config);

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) console.error(error.message);
    else console.error("Unexpected error:", error);
    throw new Error(error);
  }
}
