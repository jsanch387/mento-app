import { useState } from "react";
import { requestLoginOtp, verifyOtp } from "../actions";
import { useRouter } from "next/navigation";
import Card from "@/app/shared/components/Card";
import { LoginHeader } from "./LoginHeader";
import { RequestOtpForm } from "./RequestOtpForm";
import { VerifyOtpForm } from "./VerifyOtpForm";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleOtpRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const responseMessage = await requestLoginOtp(formData);
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

    // Debugging log to verify email and OTP are passed
    console.log("Verifying OTP with payload:", {
      email: formData.get("email"),
      otp: formData.get("otp"),
    });

    const responseMessage = await verifyOtp(formData);
    setMessage(responseMessage);

    if (responseMessage === "Login successful!") {
      router.push("/dashboard"); // Redirect to dashboard after successful verification
    }
  };

  return (
    <Card
      variant="solid"
      className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-4 sm:mx-auto p-6 sm:p-8 lg:p-10"
    >
      <div className="space-y-6 py-8">
        <LoginHeader />
        {!isOtpSent ? (
          <RequestOtpForm
            email={email}
            setEmail={setEmail}
            handleSubmit={handleOtpRequest}
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
          <p className="mt-4 font-semibold text-md text-green-500 text-center">
            {message}
          </p>
        )}
      </div>
    </Card>
  );
}
