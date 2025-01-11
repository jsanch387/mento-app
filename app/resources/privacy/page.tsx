import TopNav from "@/app/features/landing/components/TopNav";
import PrivacyAndTerms from "@/app/features/resources/PrivacyAndTerms";

export default function PrivacyPage() {
  return (
    <>
      <TopNav />
      <div className="min-h-screen flex justify-center p-10">
        <div className="max-w-5xl w-full">
          <h1 className="text-4xl font-bold text-left ">
            Privacy policy and terms of use
          </h1>
          <PrivacyAndTerms />
        </div>
      </div>
    </>
  );
}
