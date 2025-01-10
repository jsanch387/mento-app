"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import useAuthStore from "./store/authStore";

export default function AuthInitializer() {
  const { authenticated, setAuthenticated } = useAuthStore();

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function fetchSession() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error(
            "Session error:",
            error.message || "No error message provided"
          );
          setAuthenticated(false);
        } else if (!data.session) {
          console.warn("No active session found.");
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }
      } catch (unexpectedError) {
        console.error(
          "Unexpected error while fetching session:",
          unexpectedError
        );
        setAuthenticated(false);
      }
    }

    fetchSession();
  }, [setAuthenticated, authenticated]);

  return null; // This component doesn't render anything
}
