/* eslint-disable @typescript-eslint/no-explicit-any */
import LabDisplay from "@/app/features/create-lab/components/LabDisplay";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

type Params = Promise<{ id: string }>;

interface LabPageProps {
  params: Params;
}

export default async function LabPage({ params }: LabPageProps) {
  const { id } = await params;

  if (!id) {
    console.error("Missing ID in params");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">
          Invalid or Missing Lab ID
        </h1>
      </div>
    );
  }

  let lab = null;

  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get(`/labs/${id}`);
    lab = response.data.lab;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching lab:", error.message);
    } else {
      console.error("Error fetching lab:", error);
    }
  }

  if (!lab) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">
          No Lab Found with This ID
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <LabDisplay lab={lab} />
    </div>
  );
}
