"use client";

import React, { useState } from "react";
import Dropdown from "@/app/shared/components/DropDown";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";

// Predefined options for subjects and grades
const subjectOptions = [
  "Math",
  "Science",
  "History",
  "Language Arts",
  "English Literature",
];

const gradeOptions = [
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "11th Grade",
];

const LessonPlanForm = ({
  onSubmit,
}: {
  onSubmit: (data: {
    gradeLevel: string;
    subject: string;
    duration: string;
    additionalDetails?: string;
  }) => void;
}) => {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [time, setTime] = useState("");
  const [lessonDetails, setLessonDetails] = useState("");

  const isFormValid = () => {
    return (
      subject.trim() !== "" &&
      grade.trim() !== "" &&
      time.trim() !== "" &&
      lessonDetails.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit({
        gradeLevel: grade,
        subject,
        duration: time,
        additionalDetails: lessonDetails,
      });
    }
  };

  return (
    <form className="space-y-8 w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-bold mb-16">Create A New Lesson Plan</h1>

      <Dropdown
        label="What subject are you teaching?"
        placeholder="Select a subject"
        options={subjectOptions}
        onSelect={(value: string) => setSubject(value)}
      />

      <Dropdown
        label="What grade are you teaching?"
        placeholder="Select a grade"
        options={gradeOptions}
        onSelect={(value: string) => setGrade(value)}
      />

      <Input
        id="time"
        name="time"
        type="text"
        label="How much time do you have for this lesson?"
        placeholder="e.g., 45 minutes"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />

      <div className="space-y-2">
        <label
          htmlFor="lessonDetails"
          className="block text-md font-semibold text-gray-700"
        >
          Lesson Topic and Details
        </label>
        <textarea
          id="lessonDetails"
          name="lessonDetails"
          placeholder="e.g., 5th grade science lesson cycle with group activities"
          value={lessonDetails}
          onChange={(e) => setLessonDetails(e.target.value)}
          className="p-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
        />
      </div>

      <Button
        label="Create Lesson Plan"
        size="large"
        onClick={() => handleSubmit}
        disabled={!isFormValid()}
      />
    </form>
  );
};

export default LessonPlanForm;
