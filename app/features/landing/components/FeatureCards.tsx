import Card from "@/app/shared/components/Card";
import React from "react";

const features = [
  {
    title: "Lesson Plan Generator",
    description:
      "Create detailed lesson plans in minutes with AI-powered tools. Save time and focus on engaging your students.",
  },
  {
    title: "Lab Creator",
    description:
      "Design engaging, hands-on lab activities with ease. Generate experiments tailored to your lesson and grade level.",
  },
  {
    title: "Question Set Creator",
    description:
      "Effortlessly create quizzes and question sets tailored to your lesson content. Save time and assess student understanding with ease.",
  },
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {features.map((feature, index) => (
        <Card key={index}>
          <div className="flex flex-col items-start">
            {/* Placeholder for Icon */}
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
              <span className="text-gray-500">Icon</span>
            </div>
            {/* Title */}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            {/* Description */}
            <p className="text-text-secondary">{feature.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
