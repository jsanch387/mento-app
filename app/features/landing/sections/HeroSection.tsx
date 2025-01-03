import Button from "@/app/shared/components/Button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-20">
      {/* Centered Content */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start max-w-lg space-y-6">
          <h1 className="text-4xl sm:text-6xl font-black leading-tight">
            <span className="">More Time To </span>
            <span className="text-primary">Teach</span>
            <br />
            <span className="block mt-4">Less Time To </span>
            <span className="text-primary">Plan</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Revolutionize Your Teaching – Create Powerful Lesson Plans in Just
            Minutes with the Magic of AI!
          </p>
          <Button
            label="Sign Up For Free"
            size="large"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition"
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
