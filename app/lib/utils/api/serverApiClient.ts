import axios from "axios";
import { createClient } from "../supabase/server"; // Import your Supabase server client

/**
 * Creates an API client configured with the user's access token for SSR.
 * @param {boolean} [authRequired=true] - If true, requires authentication. If false, allows unauthenticated requests.
 * @returns Axios instance with or without Authorization header.
 */
export async function createServerApiClient(authRequired: boolean = true) {
  // Initialize Supabase server client
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (authRequired && (!session || !session.access_token)) {
    throw new Error("Unauthorized: No valid session found.");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authRequired && session?.access_token) {
    headers.Authorization = `Bearer ${session.access_token}`;
  }

  // Create and return an Axios client
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Backend API URL
    headers,
  });
}
