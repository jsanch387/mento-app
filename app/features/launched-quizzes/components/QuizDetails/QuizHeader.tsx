import { useState } from "react";
import { QrCodeIcon } from "@heroicons/react/24/solid";
import StatusBadge from "../StatusBadge";
import ViewQRModal from "@/app/features/create-quiz/components/ViewQRModal";

interface QuizHeaderProps {
  quiz: {
    title: string;
    className: string;
    launchDate: string;
    launchUrl: string;
    qrCodeData?: string;
    status: string;
  };
}

export default function QuizHeader({ quiz }: QuizHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format date to "Month Day, Year" (e.g., February 12, 2024)
  const formattedDate = new Date(quiz.launchDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-b pb-6 space-y-2">
      {/* Title & QR Code Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black font-sans text-gray-900 leading-tight">
          {quiz.title}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-opacity-90 transition-all"
        >
          <QrCodeIcon className="h-5 w-5" /> Show QR Code
        </button>
      </div>

      {/* Quiz Meta Info */}
      <div className="flex items-center gap-4 text-gray-500 text-lg mt-1">
        <span>Launched: {formattedDate}</span>
        <StatusBadge status={quiz.status} />
      </div>

      {/* Class Name */}
      <p className="text-gray-700 font-medium">{quiz.className}</p>

      {/* QR Code Modal */}
      <ViewQRModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        qrCodeData={quiz.qrCodeData}
        deploymentLink={quiz.launchUrl}
      />
    </div>
  );
}
