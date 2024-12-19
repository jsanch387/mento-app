"use client";

import React, { useState } from "react";
import Card from "@/app/shared/components/Card";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";

const UserInfo = ({
  firstName: initialFirstName = "",
  lastName: initialLastName = "",
}: {
  firstName?: string;
  lastName?: string;
}) => {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Info Updated:", { firstName, lastName });
    // Add API call here to update user info
  };

  return (
    <Card className="w-full max-w-3xl">
      {/* Heading */}
      <h2 className="text-xl font-bold text-blue-600 mb-6">Your Info</h2>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Inputs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
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

        {/* Update Button */}
        <Button label="Update" size="large" className="w-32" />
      </form>
    </Card>
  );
};

export default UserInfo;
