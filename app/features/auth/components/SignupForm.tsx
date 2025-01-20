"use client";

import { useState } from "react";
import { requestSignUpOtp, verifyOtp } from "../actions";
import Card from "@/app/shared/components/Card";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";
import { VerifyOtpForm } from "./VerifyOtpForm";
import Link from "next/link";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const responseMessage = await requestSignUpOtp(formData);
    setMessage(responseMessage);

    if (responseMessage.includes("OTP sent")) {
      setIsOtpSent(true);
    }
  };

  const handleOtpVerification = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const responseMessage = await verifyOtp(formData);
    setMessage(responseMessage);

    if (responseMessage === "Login successful!") {
      // Redirect to dashboard or perform other post-login actions
      console.log("User successfully signed up and logged in");
    }
  };

  return (
    <Card
      variant="solid"
      className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-4 sm:mx-auto p-6 sm:p-8 lg:p-10"
    >
      <div className="space-y-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-primary font-sans font-black">
            Create Account
          </h1>
        </div>

        {!isOtpSent ? (
          <form onSubmit={handleSignUp} className="space-y-6">
            <Input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="John"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Doe"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-sm text-gray-600 text-center mt-2">
              By signing up, you agree to our{" "}
              <Link
                href="/resources/privacy"
                className="text-primary font-semibold"
              >
                terms
              </Link>
              .
            </p>

            <Button label="Sign Up" variant="primary" className="w-full" />
          </form>
        ) : (
          <VerifyOtpForm
            email={email}
            otp={otp}
            setOtp={setOtp}
            handleSubmit={handleOtpVerification}
          />
        )}

        {message && (
          <p className="mt-4 text-sm text-green-500 text-center">{message}</p>
        )}
      </div>
    </Card>
  );
}
