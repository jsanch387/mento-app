import Card from "@/app/shared/components/Card";
import React from "react";

// Import SVG files
import BookIcon from "@/public/books.svg";
import FlaskIcon from "@/public/flask.svg";
import QuestionIcon from "@/public/question.svg";
import Image from "next/image";

const features = [
  {
    title: "Lesson Plan Generator",
    description:
      "Create detailed lesson plans in minutes with AI-powered tools. Save time and focus on engaging your students.",
    icon: BookIcon,
  },
  {
    title: "Lab Creator",
    description:
      "Design engaging, hands-on lab activities with ease. Generate experiments tailored to your lesson and grade level.",
    icon: FlaskIcon,
  },
  {
    title: "Question Set Creator",
    description:
      "Effortlessly create quizzes and question sets tailored to your lesson content. Save time and assess student understanding with ease.",
    icon: QuestionIcon,
  },
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {features.map((feature, index) => (
        <Card key={index}>
          <div className="flex flex-col items-start">
            {/* Icon */}
            <Image
              className="mb-5"
              src={feature.icon}
              alt={`${feature.title} Icon`}
              width={70}
              height={70}
              priority // Ensures this is loaded as a priority for LCP
            />
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
