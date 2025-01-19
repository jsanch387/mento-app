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
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const router = useRouter();

  const handleOtpRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const responseMessage = await requestLoginOtp(formData);

    if (responseMessage === "OTP sent!") {
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
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const responseMessage = await verifyOtp(formData);

    if (responseMessage === "Login successful!") {
      setMessageType("success");
      router.push("/dashboard"); // Redirect to dashboard after successful verification
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
          <div
            className={`mt-4 p-4 rounded-md text-center font-semibold text-md ${
              messageType === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </Card>
  );
}
