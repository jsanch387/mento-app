import FeatureCards from "../components/FeatureCards";

export default function FeaturesSection() {
  return (
    <section className="py-16 " id="features">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-sans font-black text-center mb-4">
          What you&apos;ll love
        </h2>
        <p className="text-center text-lg text-text-secondary mb-8">
          Here&apos;s what we offer now, and we&apos;re already working on
          exciting new features to make your experience even better!
        </p>
        <FeatureCards />
      </div>
    </section>
  );
}
