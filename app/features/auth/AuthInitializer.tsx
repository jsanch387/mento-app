"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import useAuthStore from "./store/authStore";

export default function AuthInitializer() {
  const { setAuthenticated } = useAuthStore();

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function fetchSession() {
      console.log("Fetching session...");

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
          console.log("Session found:", data.session);
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
  }, [setAuthenticated]);

  return null; // This component doesn't render anything
}
