import { createBrowserClient } from "@supabase/ssr";

export async function getAccessToken() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.warn(
        "Error fetching session:",
        error.message || "No error message provided"
      );
      return null;
    }

    if (!data.session) {
      console.warn("No active session found. Proceeding as guest.");
      return null;
    }

    return data.session.access_token; // Extract the access token
  } catch (unexpectedError) {
    console.error(
      "Unexpected error while fetching access token:",
      unexpectedError
    );
    return null;
  }
}
