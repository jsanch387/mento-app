"use client";

import { useState } from "react";
import { requestOtp, verifyOtp } from "../actions";
import { useRouter } from "next/navigation"; // Import useRouter

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter(); // Initialize router

  const handleOtpRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const responseMessage = await requestOtp(formData);
    setMessage(responseMessage);
    if (responseMessage === "OTP sent!") {
      setIsOtpSent(true);
    }
  };

  const handleOtpVerification = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const responseMessage = await verifyOtp(formData);
    setMessage(responseMessage);

    if (responseMessage === "Login successful!") {
      router.push("/dashboard"); // Redirect to dashboard after successful verification
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      {!isOtpSent ? (
        <form onSubmit={handleOtpRequest}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
          <button
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded"
          >
            Request OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpVerification}>
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700"
          >
            Enter OTP:
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
          <input type="hidden" name="email" value={email} />
          <button
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded"
          >
            Verify OTP
          </button>
        </form>
      )}
      {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
    </div>
  );
}
