"use client";

import ContactForm from "@/app/features/contact/components/ContactForm";
import React from "react";

export default function ContactPage() {
  const handleFormSubmit = (data: any) => {
    console.log("Contact Form Submitted:", data);
    // Handle API call or other logic here
  };

  return (
    <div className="min-h-screen flex  justify-center  px-4">
      <ContactForm onSubmit={handleFormSubmit} />
    </div>
  );
}
