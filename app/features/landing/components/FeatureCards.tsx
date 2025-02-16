import Card from "@/app/shared/components/Card";
import React from "react";
import Image from "next/image";

// Import image assets
import FlaskIcon from "@/public/flask-icon.png";
import PuzzleIcon from "@/public/puzzle-icon.png";
import BooksIcon from "@/public/books-icon.png";

const features = [
  {
    title: "Lesson Plan Generator",
    description:
      "Enter a few details, and we’ll generate a complete lesson plan so you can focus on teaching.",
    icon: BooksIcon,
    isComingSoon: false, // Indicates the feature is available
  },
  {
    title: "Analogies Crafter",
    description:
      "Provide a topic, and we’ll craft analogies that break it down for your students in an engaging way.",
    icon: PuzzleIcon,
    isComingSoon: false, // Indicates the feature is coming soon
  },
  {
    title: "Lab Creator",
    description:
      "Provide your topic, and we’ll design engaging experiments tailored to your class.",
    icon: FlaskIcon,
    isComingSoon: false, // Indicates the feature is coming soon
  },
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {features.map((feature, index) => (
        <Card variant="outline" key={index}>
          <div className="flex flex-col items-start">
            {/* Icon and Coming Soon Label */}
            <div className="flex items-center justify-between w-full mb-5">
              {/* Icon on the left */}
              <Image
                src={feature.icon}
                alt={`${feature.title} Icon`}
                width={70}
                height={70}
                priority
              />

              {/* "Coming Soon" message on the right */}
              {feature.isComingSoon && (
                <span className="text-sm font-semibold text-gray-500 px-2 py-1 border border-gray-300 rounded">
                  Coming Soon
                </span>
              )}
            </div>
            {/* Title */}
            <h3 className="text-2xl font-semibold mb-5">{feature.title}</h3>
            {/* Description */}
            <p className="text-text-secondary text-lg">{feature.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
