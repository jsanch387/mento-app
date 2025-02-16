import Button from "@/app/shared/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero" className="py-20 bg-primary">
      {/* Centered Content */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start w-full sm:w-1/2 space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-black text-white leading-tight">
            <span className="block">AI-Powered Lesson Planning</span>
            <span className="block mt-2 sm:mt-3">Save Time, Teach More</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
            Create lesson plans, labs, analogies, and more in minutes – Mento
            makes teaching easier, faster, and more effective.
          </p>

          <Link href="/signup">
            <Button
              label="Try For Free"
              size="large"
              bgColor="bg-white"
              textColor="text-primary"
              className="px-6 py-3 rounded-lg hover:bg-primary/80 transition"
            />
          </Link>
        </div>

        {/* Right Column - Image */}
        <div className="w-full sm:w-1/2 flex justify-center sm:justify-end mt-10 sm:mt-0">
          <Image
            src="/teaching-image.png"
            alt="AI-powered lesson planning tool helping teachers create engaging content"
            width={460}
            height={460}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
