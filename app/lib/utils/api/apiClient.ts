import axios from "axios";
import { getAccessToken } from "../supabase/client";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8000", // Backend API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the access token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken(); // Fetch access token from Supabase
    console.log("token", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;