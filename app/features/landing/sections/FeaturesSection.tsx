import FeatureCards from "../components/FeatureCards";

export default function FeaturesSection() {
  return (
    <section className="py-16 " id="features">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-sans font-black text-center mb-4">
          AI Features That Make Lesson Planning Effortless
        </h2>
        <FeatureCards />
      </div>
    </section>
  );
}
