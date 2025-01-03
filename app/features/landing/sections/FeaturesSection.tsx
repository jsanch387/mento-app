import FeatureCards from "../components/FeatureCards";

export default function FeaturesSection() {
  return (
    <section className="py-16 " id="features">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold  text-center">
          What you&apos;ll love
        </h2>
        <FeatureCards />
      </div>
    </section>
  );
}
