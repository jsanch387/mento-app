import { type NextRequest } from "next/server";
import { updateSession } from "@/app/lib/utils/supabase/middleware";

/**
 * Middleware for handling protected routes.
 * This middleware ensures that only authenticated users can access certain routes.
 * It uses the `updateSession` function to verify session data.
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

/**
 * Configuration for the middleware.
 * The `matcher` property defines which routes the middleware should apply to.
 * Here, it is applied to all `/dashboard` routes and subroutes.
 */
export const config = {
  matcher: ["/dashboard/:path*"],
};
