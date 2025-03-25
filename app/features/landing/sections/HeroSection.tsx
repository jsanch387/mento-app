import Link from "next/link";
import {
  BuildingOffice2Icon,
  AcademicCapIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import Button from "@/app/shared/components/Button";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center text-center bg-white overflow-hidden isolate"
      style={{
        minHeight: "60svh",
        background: `
          linear-gradient(
            160deg,
            rgba(245, 247, 250, 0.98) 0%,
            rgba(255, 255, 255, 1) 100%
          )
        `,
      }}
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#0066cc_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
      </div>

      <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        {/* Headline badge */}
        <div className="mb-4 sm:mb-6 md:mb-8 inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border border-gray-100 shadow-sm">
          <span className="text-xs sm:text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
            Teachers Save 10+ Hours Weekly
          </span>
        </div>

        {/* Responsive headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-tight [text-wrap:balance] px-4">
          Automate Teaching, Empower Students{" "}
          <span className="bg-gradient-to-r from-[#0066cc] to-[#00aacc] bg-clip-text text-transparent">
            with Mento
          </span>
        </h1>

        {/* Responsive subtext */}
        <p className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-6">
          Mento automates lesson planning, quiz grading, and student insights—so
          you can focus on what you do best: teaching.
        </p>

        {/* Responsive CTA Section */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button
              label="Get Started Free"
              size="large"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-2xl hover:-translate-y-0.5 transition-all duration-300 
              bg-gradient-to-r from-[#0066cc] to-[#00aacc] hover:shadow-lg hover:shadow-blue-100
              text-white font-semibold text-sm sm:text-base"
            />
          </Link>
        </div>

        {/* Responsive trust section */}
        <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16 px-4">
          <p className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-black mb-4 sm:mb-6">
            Trusted by Districts Across the United States
          </p>
          <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 items-center flex-wrap">
            {[BuildingOffice2Icon, AcademicCapIcon, MapPinIcon].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                  shadow-sm"
                >
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-700/90" />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Floating elements - Hidden on mobile */}
      <div className="hidden sm:block absolute top-20 -right-20 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-blue-600/50 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] animate-float" />
      <div className="hidden sm:block absolute bottom-40 -left-20 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-blue-600/50 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] animate-float-delayed" />
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-500/40 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] lg:blur-[150px] opacity-80 animate-float" />
      <div className="hidden sm:block absolute bottom-1/3 right-1/4 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-blue-400/40 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] opacity-70 animate-float-delayed" />
    </section>
  );
}
