"use client";

import React from "react";
import LabQuestions from "./LabQuestions";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { handleCopyLabDetails } from "../utils/labHelpers";
import { Lab } from "../types/Lab.types";

const LabDisplay = ({ lab }: { lab: Lab }) => {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8 bg-white rounded-2xl shadow-lg relative">
      {/* Copy Button */}
      <button
        onClick={() => handleCopyLabDetails(lab)}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
        aria-label="Copy lab details"
      >
        <ClipboardDocumentIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
      </button>

      <h1 className="text-4xl font-bold">{lab.title} 🧪</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Standards Alignment</h2>
        <p className="text-gray-700">{lab.standards_alignment}</p>
      </section>

      <p className="text-lg font-semibold text-gray-800">
        Duration: <span className="text-gray-700">{lab.duration}</span>
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p className="text-lg text-gray-700">{lab.overview}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Materials</h2>
        <ul className="list-disc pl-6 space-y-1">
          {lab.materials.map((item, index) => (
            <li key={index} className="text-gray-800">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Learning Objectives</h2>
        <ul className="list-disc pl-6 space-y-1">
          {lab.learning_objectives.map((objective, index) => (
            <li key={index} className="text-gray-800">
              {objective}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Procedure</h2>
        <ol className="pl-2 space-y-2">
          {lab.procedure.map((step, index) => (
            <li key={index} className="text-gray-800">
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Discussion Questions</h2>
        <LabQuestions questions={lab.discussion_questions} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Extensions</h2>
        <ul className="list-disc pl-6 space-y-1">
          {lab.extensions.map((extension, index) => (
            <li key={index} className="text-gray-800">
              {extension}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Safety Notes</h2>
        <ul className="list-disc pl-6 space-y-1">{lab.safety_notes}</ul>
      </section>
    </div>
  );
};

export default LabDisplay;
