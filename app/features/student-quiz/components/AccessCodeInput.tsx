"use client";

import { useState } from "react";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";
import Card from "@/app/shared/components/Card";
import { verifyAccessCode } from "../api/verifyAccessCode";

interface AccessCodeInputProps {
  deploymentId: string;
  onAccessVerified: () => void; // ✅ New prop to handle unlocking the quiz
}

export default function AccessCodeInput({
  deploymentId,
  onAccessVerified,
}: AccessCodeInputProps) {
  const [accessCode, setAccessCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await verifyAccessCode(deploymentId, accessCode);
      sessionStorage.setItem(`quizAccessCode-${deploymentId}`, accessCode);
      onAccessVerified(); // ✅ Unlock the quiz instantly
    } catch {
      setError("Invalid access code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <Card
        rounded="rounded-3xl"
        className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto p-6 sm:p-8 lg:p-10"
      >
        <div className="space-y-6 py-4">
          <h1 className="text-3xl font-black font-sans text-center text-gray-800">
            Enter Access Code
          </h1>
          <p className="text-lg text-center text-text-secondary">
            Please enter the 6-digit code provided by your teacher to begin:
          </p>

          <Input
            type="text"
            id="accessCode"
            name="accessCode"
            placeholder="6-digit code"
            label="Access Code"
            value={accessCode}
            onChange={(e) => {
              setAccessCode(e.target.value);
              setError(""); // Clear error when typing
            }}
            required
            error={error}
          />

          <Button
            label="Submit Code"
            className="w-full"
            onClick={handleSubmit}
            disabled={loading || accessCode.length !== 6}
          />
        </div>
      </Card>
    </div>
  );
}
