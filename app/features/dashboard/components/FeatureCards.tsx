import Card from "@/app/shared/components/Card";
import React from "react";
import BooksIcon from "@/public/books-icon.png";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Lesson Plan",
    description:
      "Create a complete lesson plan with objectives, materials, and activities.",
    href: "/dashboard/create-plan",
    iconSrc: BooksIcon, // Pass icon source here
  },
  // {
  //   title: "Question Sets",
  //   description: "Create quizzes or practice questions with answer keys.",
  //   href: "/question-sets",
  //   iconSrc: QuestionIcon, // Placeholder for now
  // },
];

const FeatureCards = () => {
  return (
    <div className="grid gap-4 justify-center md:grid-cols-2">
      {features.map((feature) => (
        <Card
          key={feature.title}
          variant="outline"
          className="max-w-sm cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
        >
          <Link href={feature.href} className="flex items-center gap-4">
            <Image
              src={feature.iconSrc}
              alt={`${feature.title} Icon`}
              width={60}
              height={70}
              className="shrink-0"
            />
            <div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-md text-text-secondary">
                {feature.description}
              </p>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;
