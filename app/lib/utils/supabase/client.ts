import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a browser client for Supabase.
 * This is used for client-side operations such as login, signup, or fetching user data.
 * The client uses the public Supabase URL and anon key from environment variables.
 */

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
