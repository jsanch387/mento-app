import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates a server client for Supabase.
 * This is used for server-side operations such as validating sessions and managing cookies.
 * It integrates with Next.js cookies to manage session states securely.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Gets all cookies for the current request.
         */
        getAll: () => cookieStore.getAll(),
        /**
         * Sets multiple cookies for the response.
         * This is used to update session-related cookies securely.
         */
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Silently handle the case where `setAll` is called in a Server Component.
            // This is expected if middleware is already refreshing user sessions.
          }
        },
      },
    }
  );
}
