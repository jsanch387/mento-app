"use client";

import ContactForm from "@/app/features/contact/components/ContactForm";
import { submitContactForm } from "@/app/features/contact/api/contact-api";
import React, { useState } from "react";

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
    } catch (error: any) {
      setStatus({ success: false, message: error.message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      {status ? (
        <div
          className={`mt-4 text-lg font-semibold ${
            status.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.message}
        </div>
      ) : (
        <ContactForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}
