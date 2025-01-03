import TextLogo from "@/app/shared/components/TextLogo";

export default function Footer() {
  return (
    <footer className="bg-primary bg-opacity-20 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-wrap justify-evenly items-start">
        {/* Logo */}
        <div className="flex-shrink-0 mb-6 sm:mb-0">
          <TextLogo color="white" />
        </div>

        {/* Links Container */}
        <div className="flex gap-8 flex-wrap">
          {/* Company Column */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-3">Company</h4>
            <a href="/dashboard/contact" className="text-sm hover:underline">
              Contact
            </a>
          </div>

          {/* Product Column */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-3">Product</h4>
            <a href="#features" className="text-sm hover:underline">
              Features
            </a>
            <a href="#pricing" className="text-sm hover:underline">
              Pricing
            </a>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-3">Resources</h4>
            <a href="#terms" className="text-sm hover:underline">
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
