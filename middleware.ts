import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/app/lib/utils/supabase/middleware";

/**
 * Middleware for handling protected routes.
 * It excludes the specified routes and only applies authentication checks
 * to other `/dashboard/*` routes.
 */
export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // Define routes to exclude from authentication
  const excludedRoutes = ["/dashboard/contact", "/dashboard/rate"];

  // Exclude specified routes from authentication
  if (excludedRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next(); // Allow public access
  }

  // Apply authentication for all other dashboard routes
  return await updateSession(request);
}

/**
 * Configuration for the middleware.
 * Apply to all `/dashboard` routes.
 */
export const config = {
  matcher: ["/dashboard/:path*"],
};
