"use client";

import React, { useState } from "react";
import Dropdown from "@/app/shared/components/DropDown";
import TextArea from "@/app/shared/components/TextArea";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";
import MultiSelect from "@/app/shared/components/MultiSelect";
import Toggle from "@/app/shared/components/Toggle";

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

const questionCountOptions = ["5", "10", "15"];
const questionTypeOptions = [
  "Multiple Choice",
  "Short Answer",
  "True/False",
  "Fill in the Blank",
];

interface QuizFormProps {
  onSubmit: (data: {
    topic: string;
    gradeLevel: string;
    numberOfQuestions: number;
    questionTypes: string[];
    includeHints: boolean;
    customInstructions?: string;
    subject: string;
  }) => void;
}

const QuizForm = ({ onSubmit }: QuizFormProps) => {
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [customInstructions, setCustomInstructions] = useState("");
  const [includeHints, setIncludeHints] = useState(false);
  const [topic, setTopic] = useState("");

  const isFormValid = () => {
    const finalSubject = customSubject.trim() || subject.trim();
    return (
      finalSubject !== "" &&
      grade.trim() !== "" &&
      questionCount !== null &&
      selectedTypes.length > 0 &&
      topic.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Determine the subject (use custom if provided, else use selected)
    const finalSubject = customSubject.trim() || subject.trim();

    // Perform validation only during form submission
    if (
      finalSubject !== "" &&
      grade.trim() !== "" &&
      questionCount !== null &&
      selectedTypes.length > 0 &&
      topic.trim() !== ""
    ) {
      const quizData = {
        topic: topic.trim(),
        subject: finalSubject,
        gradeLevel: grade,
        numberOfQuestions: questionCount!,
        questionTypes: selectedTypes,
        includeHints,
        customInstructions: customInstructions.trim() || undefined,
      };

      // Call the onSubmit function with the complete data
      onSubmit(quizData);
    } else {
      // Only log an error during form submission if required fields are missing
      console.error("Subject is required for quiz creation.");
    }
  };

  return (
    <form className="space-y-8 w-full max-w-lg" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-black font-sans mb-4">Generate a Quiz</h1>
      <p className="text-md text-text-secondary mb-8">
        Create a structured quiz with auto-generated questions, answers, and
        explanations.
      </p>

      <Input
        id="topic"
        name="topic"
        type="text"
        label="What is the quiz topic?"
        placeholder="e.g., Photosynthesis, Algebra, World War II"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <Dropdown
        label="What subject is the quiz for?"
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

      <Dropdown
        label="How many questions should the quiz have?"
        placeholder="Select number of questions"
        options={questionCountOptions}
        onSelect={(value) => setQuestionCount(Number(value))}
      />

      {/* Temporary Multi-Select for Question Types */}
      <MultiSelect
        label="Select Question Types"
        options={questionTypeOptions}
        selectedOptions={selectedTypes}
        onChange={setSelectedTypes}
      />

      <TextArea
        id="customInstructions"
        name="customInstructions"
        label="Custom Instructions (Optional)"
        placeholder="e.g., Include real-world examples, keep it simple for beginners."
        value={customInstructions}
        onChange={(e) => setCustomInstructions(e.target.value)}
        rows={4}
      />

      {/* Minimal Toggle Switch for Hints */}
      {/* <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">
          Include Hints?
        </span>
        <button
          type="button"
          className={`w-10 h-5 rounded-full ${
            includeHints ? "bg-blue-500" : "bg-gray-300"
          } relative`}
          onClick={() => setIncludeHints(!includeHints)}
        >
          <span
            className={`absolute w-4 h-4 bg-white rounded-full transition-all ${
              includeHints ? "right-1" : "left-1"
            }`}
          />
        </button>
      </div> */}
      <Toggle
        label="Include Hints?"
        options={["Yes", "No"]}
        value={includeHints ? "Yes" : "No"}
        onChange={(selected, e) => {
          // Prevent form submission when toggling
          e.preventDefault();
          setIncludeHints(selected === "Yes");
        }}
      />

      <Button label="Generate Quiz" size="large" disabled={!isFormValid()} />
    </form>
  );
};

export default QuizForm;
