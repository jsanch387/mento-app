import React from "react";
import { StarIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

interface Review {
  name: string;
  message: string;
}

const reviews: Review[] = [
  {
    name: "Olivia Martinez",
    message:
      "Mento makes lesson planning so much simpler! I can set up my entire week in minutes instead of hours.",
  },
  {
    name: "Daniel Murphy",
    message:
      "I love how organized everything is. My students are more engaged, and I feel less stressed.",
  },
  {
    name: "Sarah Brown",
    message:
      "Honestly, this is the easiest planning tool I’ve ever used. It’s a total game-changer for busy teachers.",
  },
  {
    name: "Michael Reyes",
    message:
      "The templates and resources are fantastic. I save so much time and can focus on teaching.",
  },
];

// Helper function to extract initials from the reviewer's name
const getInitials = (name: string): string => {
  const words = name.split(" ");
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

export default function TestimonialsSection() {
  return (
    <section className="bg-white w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <AcademicCapIcon className="mx-auto h-8 w-8 text-primary mb-2" />
          <h2 className="text-2xl md:text-3xl font-black font-sans text-gray-800 mb-2">
            Join 1000+ Teachers Using Mento
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl border flex flex-col h-full"
            >
              {/* Avatar & Name */}
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mr-3">
                  {getInitials(review.name)}
                </div>
                <p className="font-semibold text-gray-900">{review.name}</p>
              </div>

              {/* Review Message */}
              <p className="text-gray-700 mb-4 flex-grow">{review.message}</p>

              {/* Star Rating */}
              <div className="flex mt-auto">
                {Array.from({ length: 5 }).map((_, starIdx) => (
                  <StarIcon key={starIdx} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
