"use server";

import { createClient } from "@/app/lib/utils/supabase/server";
import { redirect } from "next/navigation";

// Action to request OTP
export async function requestOtp(formData: FormData): Promise<string> {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true, // Automatically create user
    },
  });

  if (error) {
    console.error("Error requesting OTP:", error.message);
    return "Failed to send OTP. Please try again.";
  }

  return "OTP sent!";
}

// Action to verify OTP
export async function verifyOtp(formData: FormData): Promise<string> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const otp = formData.get("otp") as string;

  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email", // OTP type
  });

  if (error) {
    console.error("Error verifying OTP:", error.message);
    return "Invalid OTP. Please try again.";
  }

  // Redirect after successful verification
  redirect("/dashboard");
  return "Login successful!";
}
