"use client";

import React from "react";

interface LessonPlanProps {
  title: string;
  overview: {
    gradeLevel: string;
    subject: string;
    duration: string;
    standards: string;
  };
  materials: string[];
  learningObjectives: string[];
  lessonPlanStructure: {
    [key: string]: {
      time: string;
      description: string;
    };
  };
}

const LessonPlan = ({ lessonPlan }: { lessonPlan: LessonPlanProps }) => {
  if (!lessonPlan) {
    return null; // Render nothing if no lesson plan is available
  }

  return (
    <div className="mt-8 p-6 border rounded max-w-4xl ">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">{lessonPlan.title}</h1>

      {/* Overview Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Overview</h2>
        <div>
          <p>
            <strong>Grade Level:</strong> {lessonPlan.overview.gradeLevel}
          </p>
          <p>
            <strong>Subject:</strong> {lessonPlan.overview.subject}
          </p>
          <p>
            <strong>Duration:</strong> {lessonPlan.overview.duration}
          </p>
          <p>
            <strong>Standards:</strong> {lessonPlan.overview.standards}
          </p>
        </div>
      </div>

      {/* Materials Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Materials</h2>
        <ul className="list-disc pl-6">
          {lessonPlan.materials.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Learning Objectives Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Learning Objectives</h2>
        <ol className="list-decimal pl-6">
          {lessonPlan.learningObjectives.map(
            (objective: string, index: number) => (
              <li key={index} className="mb-2">
                {objective}
              </li>
            )
          )}
        </ol>
      </div>

      {/* Lesson Plan Structure Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Lesson Plan Structure</h2>
        {Object.entries(lessonPlan.lessonPlanStructure).map(
          (
            [key, value]: [string, { time: string; description: string }],
            index: number
          ) => (
            <div key={index} className="mb-4">
              <h3 className="text-md font-semibold mb-2 capitalize">
                {key} ({value.time})
              </h3>
              <p>{value.description}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LessonPlan;
