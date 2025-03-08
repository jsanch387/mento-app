"use client";

import React, { useState } from "react";
import Dropdown from "@/app/shared/components/DropDown";
import TextArea from "@/app/shared/components/TextArea";
import Input from "@/app/shared/components/Input";
import Button from "@/app/shared/components/Button";
import MultiSelect from "@/app/shared/components/MultiSelect";
import Toggle from "@/app/shared/components/Toggle";
import { gradeOptions, subjectOptions } from "@/app/shared/constants/constants";

// Mapping for display vs backend types
const questionTypeMapping = {
  "Multiple Choice": "multiple_choice",
  "Short Answer": "short_answer",
  "True/False": "true_false",
  "Fill in the Blank": "fill_in_the_blank",
};

// Display options for the multi-select (human-friendly)
const questionTypeOptions = [
  "Multiple Choice",
  "Short Answer",
  "True/False",
  "Fill in the Blank",
];

const questionCountOptions = ["5", "10", "15"];

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
  const [selectedTypes, setSelectedTypes] = useState<
    (keyof typeof questionTypeMapping)[]
  >([]);
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

    const finalSubject = customSubject.trim() || subject.trim();

    if (
      finalSubject !== "" &&
      grade.trim() !== "" &&
      questionCount !== null &&
      selectedTypes.length > 0 &&
      topic.trim() !== ""
    ) {
      // Convert displayed question types to backend-friendly types
      const backendQuestionTypes = selectedTypes.map(
        (type) => questionTypeMapping[type as keyof typeof questionTypeMapping]
      );

      const quizData = {
        topic: topic.trim(),
        subject: finalSubject,
        gradeLevel: grade,
        numberOfQuestions: questionCount!,
        questionTypes: backendQuestionTypes,
        includeHints,
        customInstructions: customInstructions.trim() || undefined,
      };

      onSubmit(quizData);
    } else {
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

      <MultiSelect
        label="Select Question Types"
        options={questionTypeOptions} // ✅ Now human-readable
        selectedOptions={selectedTypes}
        onChange={(selected: string[]) =>
          setSelectedTypes(selected as (keyof typeof questionTypeMapping)[])
        }
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

      <Toggle
        label="Include Question Hints?"
        options={["Yes", "No"]}
        value={includeHints ? "Yes" : "No"}
        onChange={(selected, e) => {
          e.preventDefault();
          setIncludeHints(selected === "Yes");
        }}
      />

      <Button label="Generate Quiz" size="large" disabled={!isFormValid()} />
    </form>
  );
};

export default QuizForm;
