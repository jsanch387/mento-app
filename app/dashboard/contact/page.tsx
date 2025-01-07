"use client";

import ContactForm from "@/app/features/contact/components/ContactForm";
import { submitContactForm } from "@/app/features/contact/api/contact-api";
import React, { useState } from "react";
import ErrorMessage from "@/app/shared/components/ErrorMessage";
import SuccessMessage from "@/app/shared/components/SuccessMessage";

export default function ContactPage() {
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleFormSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }) => {
    try {
      const response = await submitContactForm(data);
      setStatus({ success: true, message: response.message });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatus({ success: false, message: error.message });
      } else {
        setStatus({ success: false, message: "An unknown error occurred" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      {status ? (
        status.success ? (
          <SuccessMessage message={status.message} />
        ) : (
          <ErrorMessage error={status.message} />
        )
      ) : (
        <ContactForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}
