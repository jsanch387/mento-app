import Button from "@/app/shared/components/Button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="hero" className="py-20 bg-primary">
      {/* Centered Content */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start max-w-lg space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight text-white mb-8">
            <span className="block whitespace-nowrap">More Time To Teach</span>
            <span className="block mt-4 whitespace-nowrap">
              Less Time To Plan
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 ">
            Revolutionize Your Teaching – Create Powerful Lesson Plans in Just
            Minutes with the Magic of AI!
          </p>
          <Button
            label="Sign Up For Free"
            size="large"
            bgColor="bg-white"
            textColor="text-text-primary"
            className="px-6 py-3 rounded-lg hover:bg-primary/80 transition"
          />
        </div>

        {/* Right Column - Natural Image */}
        <div className="mt-10 sm:mt-0 sm:ml-16 flex-shrink-0">
          <Image
            src="/teaching-image.png"
            alt="Teacher teaching"
            width={460}
            height={460}
            className=""
          />
        </div>
      </div>
    </section>
  );
}
