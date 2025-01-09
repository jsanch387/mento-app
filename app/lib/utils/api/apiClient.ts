import axios from "axios";
import { getAccessToken } from "../supabase/client";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Backend API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the access token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAccessToken(); // Fetch access token from Supabase
      console.log("token", token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
      } else {
        console.info("Proceeding without token for unauthenticated route.");
      }

      return config;
    } catch (error) {
      console.error("Error attaching token to request:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
