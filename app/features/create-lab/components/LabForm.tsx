"use client";

import React, { useState } from "react";
import Dropdown from "@/app/shared/components/DropDown";
import TextArea from "@/app/shared/components/TextArea";
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

interface LabFormProps {
  onSubmit: (data: {
    gradeLevel: string;
    subject: string;
    standards?: string;
    duration: string;
    context: string;
  }) => void;
}

const LabForm = ({ onSubmit }: LabFormProps) => {
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [standards, setStandards] = useState("");
  const [duration, setDuration] = useState("");
  const [context, setContext] = useState("");

  const isFormValid = () =>
    (subject.trim() !== "" || customSubject.trim() !== "") &&
    grade.trim() !== "" &&
    duration.trim() !== "" &&
    context.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      const labData = {
        gradeLevel: grade,
        subject: customSubject || subject,
        standards: standards.trim() || undefined,
        duration,
        context,
      };
      onSubmit(labData);
    }
  };

  return (
    <form className="space-y-8 w-full max-w-lg" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-black font-sans mb-4">Create a Lab</h1>
      <p className="text-md text-text-secondary mb-8">
        Create a complete lab with objectives, materials, and activities
        tailored to your class needs.
      </p>

      <Dropdown
        label="What subject is the lab for?"
        placeholder="Select a subject"
        options={subjectOptions}
        onSelect={setSubject}
      />

      <Input
        id="customSubject"
        name="customSubject"
        type="text"
        label="Or type your own subject"
        placeholder="e.g., Marine Biology, Robotics"
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
        id="standards"
        name="standards"
        type="text"
        label="Standards (optional)"
        placeholder="e.g., NGSS: 5-PS1-1"
        value={standards}
        onChange={(e) => setStandards(e.target.value)}
      />

      <Input
        id="duration"
        name="duration"
        type="text"
        label="Duration (in minutes)"
        placeholder="e.g., 60 minutes"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <TextArea
        id="context"
        name="context"
        label="Lab Details"
        placeholder="e.g., Create a hands-on lab for 5th graders to explore the water cycle."
        value={context}
        onChange={(e) => setContext(e.target.value)}
        helperText="Provide details on the topic and specifics for the lab. The more context you give, the better the lab will be."
        rows={6}
      />

      <Button label="Generate Lab" size="large" disabled={!isFormValid()} />
    </form>
  );
};

export default LabForm;
