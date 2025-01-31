"use client";

import { useState } from "react";
import { requestSignUpOtp, verifyOtp } from "../actions";
import Card from "@/app/shared/components/Card";
import SignupDetailsForm from "./SignupDetailsForm";
import { VerifyOtpForm } from "./VerifyOtpForm";
import AlertMessage from "@/app/shared/components/AlertMessage";
import { validateEmail } from "../utils/helpers";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [emailError, setEmailError] = useState("");

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate the email before submitting
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setMessageType("error");
      setMessage("");
      return;
    }

    setEmailError(""); // Clear any previous error

    const formData = new FormData(event.currentTarget);
    const responseMessage = await requestSignUpOtp(formData);

    if (responseMessage.includes("OTP sent")) {
      setMessageType("success");
      setIsOtpSent(true);
    } else {
      setMessageType("error");
    }
    setMessage(responseMessage);
  };

  const handleOtpVerification = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const responseMessage = await verifyOtp(formData);

    if (responseMessage === "Login successful!") {
      setMessageType("success");
      console.log("User successfully signed up and logged in");
    } else {
      setMessageType("error");
    }
    setMessage(responseMessage);
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
          <SignupDetailsForm
            email={email}
            setEmail={setEmail}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            emailError={emailError}
            handleSubmit={handleSignUp}
          />
        ) : (
          <VerifyOtpForm
            email={email}
            otp={otp}
            setOtp={setOtp}
            handleSubmit={handleOtpVerification}
          />
        )}

        {message && (
          <AlertMessage
            message={message}
            type={messageType as "success" | "error"}
          />
        )}
      </div>
    </Card>
  );
}
