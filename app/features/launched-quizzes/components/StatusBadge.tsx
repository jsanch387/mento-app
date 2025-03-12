import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  // Normalize status to prevent case mismatches
  const normalizedStatus =
    status.toLowerCase() === "active" ? "Active" : "Closed";

  return (
    <span
      className={`px-3 py-1 text-sm font-medium flex items-center gap-1 rounded-full ${
        normalizedStatus === "Active"
          ? "bg-green-100 text-green-800"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {normalizedStatus === "Active" ? (
        <CheckCircleIcon className="h-4 w-4 text-green-600" />
      ) : (
        <XCircleIcon className="h-4 w-4 text-gray-600" />
      )}
      {normalizedStatus}
    </span>
  );
}
