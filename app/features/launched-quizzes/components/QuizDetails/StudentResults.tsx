"use client";

import { useState } from "react";
import {
  UsersIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import Card from "@/app/shared/components/Card";

interface StudentResultsProps {
  students: {
    id: string;
    name: string;
    score: number;
    correct: number;
    incorrect: number;
    status: string;
  }[];
}

export default function StudentResults({ students }: StudentResultsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card variant="outline" rounded="rounded-3xl" className="mt-6">
      {/* Collapsible Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <UsersIcon className="h-6 w-6 text-blue-500" /> Student Results
        </h2>
        {isOpen ? (
          <ChevronDownIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <ChevronRightIcon className="h-6 w-6 text-gray-600" />
        )}
      </div>

      {/* Collapsible Student Table */}
      {isOpen && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-gray-900">
            <thead className="bg-gray-100 text-gray-700 text-md uppercase">
              <tr>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Score</th>
                <th className="px-6 py-3">✅ Correct</th>
                <th className="px-6 py-3">❌ Incorrect</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.score}%</td>
                  <td className="px-6 py-4">{student.correct}</td>
                  <td className="px-6 py-4">{student.incorrect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
