"use client";

import React from "react";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";
import Link from "next/link";

interface SignupDetailsFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  emailError?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignupDetailsForm: React.FC<SignupDetailsFormProps> = ({
  email,
  setEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  emailError,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        error={emailError}
        required
      />
      <p className="text-sm text-gray-600 text-center mt-2">
        By signing up, you agree to our{" "}
        <Link href="/resources/privacy" className="text-primary font-semibold">
          terms
        </Link>
        .
      </p>
      <Button label="Sign Up" variant="primary" className="w-full" />
    </form>
  );
};

export default SignupDetailsForm;
