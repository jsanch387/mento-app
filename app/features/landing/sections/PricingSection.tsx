import PricingCards from "../components/PricingCards";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 ">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold  text-center mb-12">
          Plans that work for you
        </h2>
        <PricingCards cardVariant="outline" />
      </div>
    </section>
  );
}
