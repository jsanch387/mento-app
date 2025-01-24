"use client";

import React, { useState } from "react";
import Dropdown from "@/app/shared/components/DropDown";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";

const subjectOptions = [
  "Math",
  "Science",
  "History",
  "Language Arts",
  "English Literature",
  "Social Studies",
  "Art",
  "Music",
  "Physical Education",
  "Health",
  "Computer Science",
  "STEM/STEAM",
  "Economics",
  "Government",
  "World Languages",
  "Geography",
  "Special Education",
];

const gradeOptions = [
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
];

const AnalogyForm = ({
  onSubmit,
}: {
  onSubmit: (data: {
    gradeLevel: string;
    subject: string;
    context: string;
  }) => void;
}) => {
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [context, setContext] = useState("");

  const isFormValid = () =>
    (subject.trim() !== "" || customSubject.trim() !== "") &&
    grade.trim() !== "" &&
    context.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit({
        gradeLevel: grade,
        subject: customSubject || subject,
        context,
      });
    }
  };

  return (
    <form className="space-y-8 w-full max-w-lg" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-black font-sans mb-4">Create an Analogy</h1>
      <p className="text-md text-text-secondary mb-8">
        Quickly create easy-to-understand comparisons to help explain complex
        topics to your students.
      </p>

      <Dropdown
        label="What subject is the analogy for?"
        placeholder="Select a subject"
        options={subjectOptions}
        onSelect={setSubject}
      />

      <Input
        id="customSubject"
        name="customSubject"
        type="text"
        label="Or type your own subject"
        placeholder="e.g., Marine Biology, Creative Writing"
        value={customSubject}
        onChange={(e) => setCustomSubject(e.target.value)}
      />

      <Dropdown
        label="What grade level is this for?"
        placeholder="Select a grade"
        options={gradeOptions}
        onSelect={setGrade}
      />

      <Input
        id="context"
        name="context"
        type="text"
        label="Describe the topic or concept"
        placeholder="e.g., Explain photosynthesis in simple terms for 6th graders."
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />

      <Button
        label="Generate Analogies"
        size="large"
        disabled={!isFormValid()}
        // type="submit"
      />
    </form>
  );
};

export default AnalogyForm;
