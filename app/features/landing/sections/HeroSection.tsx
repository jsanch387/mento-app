import Button from "@/app/shared/components/Button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-background py-16">
      {/* Centered Content with Max Width */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start max-w-lg space-y-8">
          <h1 className="text-4xl sm:text-5xl  font-black">
            <span>More Time To </span>
            <span className="text-primary">Teach</span>
            <br />
            <span className="pt-7 inline-block">Less Time To </span>
            <span className="text-primary"> Plan</span>
          </h1>
          <p className="text-xl text-text-secondary">
            Transform hours of work into minutes with AI-powered lesson planning
            and resources.
          </p>
          <Button label="Sign Up For Free" size="large" />
        </div>

        {/* Right Column - Placeholder for Illustration */}
        <div className="mt-10 sm:mt-0 sm:ml-16 flex-shrink-0">
          <Image
            src="/teaching-image.png"
            alt="Teacher teaching"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}
