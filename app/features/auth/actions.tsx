"use server";

import { createClient } from "@/app/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import useAuthStore from "./store/authStore";

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

export async function requestSignUpOtp(formData: FormData): Promise<string> {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;

  // Step 1: Sign up the user
  const { error: authError } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true, // Automatically create the user in auth.users
      data: { first_name: firstName, last_name: lastName }, // Add metadata
    },
  });

  if (authError) {
    console.error("Error requesting signup OTP:", authError.message);
    return "Failed to send OTP. Please try again.";
  }

  // Step 2: Retrieve the user using listUsers() to find by email
  const { data: userData, error: userListError } =
    await supabase.auth.admin.listUsers();

  if (userListError) {
    console.error("Error fetching user list:", userListError.message);
    return "Signup failed. Please try again.";
  }

  // Find the user in the list by email
  const user = userData?.users.find((user) => user.email === email);

  if (!user) {
    console.error("User not found after signup.");
    return "Signup failed. Please contact support.";
  }

  const userId = user.id;

  // Step 3: Create a profile for the new user
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: userId, // Link to auth.users.id
      first_name: firstName,
      last_name: lastName,
      tier: "free", // Default tier
    },
  ]);

  if (profileError) {
    console.error("Error creating user profile:", profileError.message);
    return "Failed to create user profile. Please contact support.";
  }

  return "OTP sent! Please check your email.";
}
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

  // Update Zustand state to authenticated
  const setAuthenticated = useAuthStore.getState().setAuthenticated;
  setAuthenticated(true);

  redirect("/dashboard"); // Navigate to the dashboard
  return "Login successful!";
}

// Action to log out the user
export async function logout(): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error during logout:", error.message);
    throw new Error("Failed to log out. Please try again.");
  }

  // Update Zustand state to unauthenticated
  const setAuthenticated = useAuthStore.getState().setAuthenticated;
  setAuthenticated(false);

  redirect("/"); // Redirect to the homepage
}
