import { createBrowserClient } from "@supabase/ssr";

export async function getAccessToken() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    console.error("Error fetching session:", error?.message);
    return null;
  }
  console.log("data.session.access_token", data.session.access_token);

  return data.session.access_token; // Extract the access token
}
