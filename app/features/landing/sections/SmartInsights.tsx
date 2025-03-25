import Image from "next/image";
import InsightImage from "/public/smart-insights-image.png";

export default function SmartInsightImage() {
  return (
    <section className="py-12 px-4 bg-white text-center">
      <h2 className="text-3xl sm:text-4xl font-black font-sans mb-4">
        Get Smart, Instant Quiz Feedback
      </h2>
      <p className="text-text-secondary text-base sm:text-lg md:text-xl">
        Mento grades your quizzes and shows you where students are struggling —
        so you don’t have to dig for it.
      </p>
      <Image
        src={InsightImage}
        alt="Mento app screenshot showing Smart Insights on student quiz results"
        width={1800}
        height={1125}
        className="w-full max-w-[90rem] mx-auto h-auto"
        priority
      />
    </section>
  );
}
