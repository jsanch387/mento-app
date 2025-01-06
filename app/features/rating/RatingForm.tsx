"use client";

import React, { useState } from "react";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";
import StarRating from "@/app/shared/components/StarRating";

interface RatingFormData {
  firstName: string;
  lastName: string;
  email: string;
  rating: number;
  comment: string;
}

const RatingForm = ({
  onSubmit,
}: {
  onSubmit: (data: RatingFormData) => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      rating > 0 &&
      comment.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit({
        firstName,
        lastName,
        email,
        rating,
        comment,
      });
    }
  };

  return (
    <form
      className="space-y-6 mt-10 w-full max-w-lg mx-auto rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-bold mb-10 text-left">
        We value your feedback!
      </h1>

      {/* First Name */}
      <Input
        id="firstName"
        name="firstName"
        type="text"
        label="First Name"
        placeholder="Enter your first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      {/* Last Name */}
      <Input
        id="lastName"
        name="lastName"
        type="text"
        label="Last Name"
        placeholder="Enter your last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      {/* Email */}
      <Input
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Star Rating */}
      <div>
        <label className="block text-xl font-semibold text-gray-700 mb-2">
          Rate Us
        </label>
        <StarRating rating={rating} onRate={(rate) => setRating(rate)} />
      </div>

      {/* Comments */}
      <div className="space-y-2">
        <label
          htmlFor="comment"
          className="block text-md font-semibold text-gray-700"
        >
          Share your thoughts
        </label>
        <textarea
          id="comment"
          name="comment"
          placeholder="I really liked how..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="p-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button label="Submit" size="large" disabled={!isFormValid()} />
    </form>
  );
};

export default RatingForm;
