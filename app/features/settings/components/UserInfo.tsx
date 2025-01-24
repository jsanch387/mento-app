"use client";

import React, { useState } from "react";
import Card from "@/app/shared/components/Card";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";
import { updateUserInfo } from "./api/user-api";

const UserInfo = ({
  firstName: initialFirstName,
  lastName: initialLastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Use API utility to update user info
      const updatedUser = await updateUserInfo({ firstName, lastName });

      setStatus({ success: true, message: "Profile updated successfully!" });

      // Update state with the latest data
      setFirstName(updatedUser.firstName);
      setLastName(updatedUser.lastName);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setStatus({ success: false, message: error.message });
    }
  };

  return (
    <Card className="w-full max-w-3xl">
      <h2 className="text-2xl font-black font-sans text-blue-600 mb-6">
        Your Info
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            label="First Name"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="flex-1"
          />
          <Input
            label="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="flex-1"
          />
        </div>

        <Button label="Update" size="large" className="w-32" />

        {status && (
          <p
            className={`text-center mt-4 font-semibold ${
              status.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </Card>
  );
};

export default UserInfo;
