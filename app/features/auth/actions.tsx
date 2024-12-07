"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/utils/supabase/server";

// Server action for login
export async function login(formData: FormData) {
  const supabase = await createClient(); // Await the client creation

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error(error);
    redirect("/error");
  }

  redirect("/dashboard");
}

// Server action for signup
export async function signup(formData: FormData) {
  const supabase = await createClient(); // Await the client creation

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error(error);
    redirect("/error");
  }

  redirect("/dashboard");
}
