import React, { useState } from "react";
import Dropdown from "@/app/shared/components/DropDown";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";
import { gradeOptions, subjectOptions } from "@/app/shared/constants/constants";
import { GenerateLessonPlanRequest } from "../types/types";

// 🔹 Props Interface
interface LessonPlanFormProps {
  onSubmit: (data: GenerateLessonPlanRequest) => void;
}

const LessonPlanForm: React.FC<LessonPlanFormProps> = ({ onSubmit }) => {
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [time, setTime] = useState("");
  const [lessonDetails, setLessonDetails] = useState("");

  const isFormValid = () => {
    return (
      (subject.trim() !== "" || customSubject.trim() !== "") &&
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
        subject: customSubject || subject,
        duration: time,
        additionalDetails: lessonDetails,
      });
    }
  };

  return (
    <form
      className="space-y-8 mt-5 w-full max-w-lg px-4 mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="space-y-5">
        <h1 className="text-4xl font-sans font-black">Create Lesson Plan</h1>
        <p className="text-md text-text-secondary mb-8">
          Quickly generate a tailored lesson plan designed to fit your
          class&apos;s needs.
        </p>
      </div>

      <Dropdown
        label="What subject are you teaching?"
        placeholder="Select a subject"
        options={subjectOptions}
        onSelect={(value: string) => setSubject(value)}
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
          Describe the Lesson Topic and Key Details
        </label>
        <p className="text-sm text-text-secondary">
          The more details you provide, the better the generated lesson plan
          will be. Include specifics like topic, activities, and any teaching
          aids or goals.
        </p>
        <textarea
          id="lessonDetails"
          name="lessonDetails"
          placeholder="e.g., A 5th-grade science lesson on the water cycle, including an engaging group activity where students simulate evaporation and condensation"
          value={lessonDetails}
          onChange={(e) => setLessonDetails(e.target.value)}
          className="p-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary h-40 resize-none"
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
