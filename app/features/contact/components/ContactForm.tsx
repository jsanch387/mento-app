"use client";

import React, { useState } from "react";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";

interface ContactFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      message.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit({
        firstName,
        lastName,
        email,
        message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-3xl p-6 ">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-left mb-2">Contact Us</h1>
        <p className="text-text-secondary text-left">
          Your experience matters to us! Whether you have feedback, questions,
          or need help, our team is ready to assist.
        </p>
      </div>

      {/* First Name and Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Input
          label="Last Name"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Message */}
      <div className="space-y-2">
        <textarea
          id="message"
          name="message"
          placeholder="Describe your issue or share your thoughts here."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="p-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="flex">
        <Button label="Submit" size="large" disabled={!isFormValid()} />
      </div>
    </form>
  );
}
