import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Updates the session for the current request.
 * This function ensures user authentication by validating session cookies and redirecting
 * unauthenticated users to the `/login` page.
 */
export async function updateSession(request: NextRequest) {
  // Default response allowing the request to proceed.
  const supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Retrieves all cookies for the current request.
         */
        getAll: () => request.cookies.getAll(),
        /**
         * Sets cookies for the response.
         */
        setAll: (cookiesToSet) => {
          // Update cookies in the response object
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Fetch user information from Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated users to the login page, except for `/login` and `/auth` routes.
  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  /**
   * IMPORTANT:
   * Always return the `supabaseResponse` object to ensure session cookies are
   * properly synchronized between the server and client.
   */
  return supabaseResponse;
}
