"use server";

import { createClient } from "@/app/lib/utils/supabase/server";
import { redirect } from "next/navigation";

// Action to request OTP for Login
// export async function requestLoginOtp(formData: FormData): Promise<string> {
//   const supabase = await createClient();
//   const email = formData.get("email") as string;

//   // Send OTP
//   const { error } = await supabase.auth.signInWithOtp({
//     email,
//     options: { shouldCreateUser: false },
//   });

//   if (error) {
//     console.error("Error requesting OTP:", error.message);
//     return "Failed to send OTP. Please try again.";
//   }

//   return "OTP sent!";
// }

export async function requestLoginOtp(formData: FormData): Promise<string> {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  try {
    // Fetch the list of users and check if the email exists
    const { data: userData, error: userError } =
      await supabase.auth.admin.listUsers();

    if (userError) {
      console.error("Error fetching user data:", userError.message);
      return "An unexpected error occurred. Please try again.";
    }

    const userExists = userData?.users?.some((user) => user.email === email);

    if (!userExists) {
      console.warn(`User not found for email: ${email}`);
      return "User not found. Please sign up.";
    }

    // If the user exists, proceed to request OTP
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });

    if (otpError) {
      console.error("Error requesting OTP:", otpError.message);
      return "Failed to send OTP. Please try again.";
    }

    return "OTP sent!";
  } catch (error) {
    console.error("Unexpected error:", error);
    return "A system error occurred. Please try again.";
  }
}

// Action to request OTP for Signup
export async function requestSignUpOtp(formData: FormData): Promise<string> {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;

  // Send OTP
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true, // Automatically create the user
      data: { first_name: firstName, last_name: lastName },
    },
  });

  if (error) {
    console.error("Error requesting signup OTP:", error.message);
    return "Failed to send OTP. Please try again.";
  }

  return "OTP sent! Please check your email.";
}

// Action to verify OTP
export async function verifyOtp(formData: FormData): Promise<string> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const otp = formData.get("otp") as string;

  // Verify OTP
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email", // OTP type
  });

  if (error) {
    console.error("Error verifying OTP:", error.message);
    return "Invalid OTP. Please try again.";
  }

  redirect("/dashboard");
  return "Login successful!";
}
