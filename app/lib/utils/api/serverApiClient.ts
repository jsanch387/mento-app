import axios from "axios";
import { createClient } from "../supabase/server"; // Import your Supabase server client

/**
 * Creates an API client configured with the user's access token for SSR.
 * @returns Axios instance with Authorization header.
 */
export async function createServerApiClient() {
  // Initialize Supabase server client
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.access_token) {
    throw new Error("Unauthorized: No valid session found.");
  }

  const token = session.access_token;

  // Create and return an Axios client with the Authorization header
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Backend API URL
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
