import Card from "@/app/shared/components/Card";
import React from "react";
import BooksIcon from "@/public/books-icon.png";
import PuzzleIcon from "@/public/puzzle-icon.png";
import FlaskIcon from "@/public/flask-icon.png";
import ClipBoardIcon from "@/public/clip-board.png";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Lesson Plan",
    description:
      "Create a complete lesson plan with objectives, materials, and activities tailored to your class needs.",
    href: "/dashboard/create-plan",
    iconSrc: BooksIcon,
  },
  {
    title: "Analogies",
    description:
      "Simplify complex topics with relatable analogies that make learning easier and more engaging for your students.",
    href: "/dashboard/create-analogy",
    iconSrc: PuzzleIcon,
  },
  {
    title: "Lab",
    description:
      "Create a complete lab with objectives, materials, and activities tailored to your class needs.",
    href: "/dashboard/create-lab",
    iconSrc: FlaskIcon,
  },
  {
    title: "Quiz",
    description:
      "Generate customizable quizzes with diverse question types to assess student understanding effectively.",
    href: "/dashboard/create-quiz",
    iconSrc: ClipBoardIcon,
  },
];

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-4 mt-6 w-full">
      {features.map((feature) => (
        <Card
          rounded="rounded-3xl"
          key={feature.title}
          variant="outline"
          className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
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
