import FeatureCards from "../components/FeatureCards";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold  text-center">
          What You&apos;ll Love
        </h2>
        <FeatureCards />
      </div>
    </section>
  );
}
