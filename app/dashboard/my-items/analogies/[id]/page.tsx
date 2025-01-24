/* eslint-disable @typescript-eslint/no-explicit-any */
import Analogies from "@/app/features/create-analogy/components/Analogies";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

type Params = Promise<{ id: string }>;

interface AnalogyGroupPageProps {
  params: Params;
}

export default async function AnalogyGroupPage({
  params,
}: AnalogyGroupPageProps) {
  const { id } = await params;

  if (!id) {
    console.error("Missing ID in params");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">
          Invalid or Missing Analogy Group ID
        </h1>
      </div>
    );
  }

  let analogies = [];
  let context = "";
  let subject = "";
  let gradeLevel = "";
  let createdAt = "";

  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get(`/analogies/${id}`);
    analogies = response.data.analogies.map((analogy: any) => ({
      id: analogy.id,
      title: analogy.title,
      analogy: analogy.analogy,
    }));

    // Extract shared metadata from the first analogy (all analogies in the group share this data)
    if (response.data.analogies.length > 0) {
      const firstAnalogy = response.data.analogies[0];
      context = firstAnalogy.context || "";
      subject = firstAnalogy.subject || "";
      gradeLevel = firstAnalogy.grade_level || "";
      createdAt = firstAnalogy.created_at || "";
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching analogies:", error.message);
    } else {
      console.error("Error fetching analogies:", error);
    }
  }

  if (analogies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">
          No Analogies Found for This Group
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6">
      {/* Container for the context information */}
      <div className="w-full max-w-4xl mb-8">
        <div className="bg-white p-6 ">
          {context && (
            <p className="text-lg font-bold text-gray-800 mb-2">
              Context: {context}
            </p>
          )}
          <p className="text-md text-gray-600 mb-2">
            {subject && <span>Subject: {subject}</span>}
            {subject && gradeLevel && <span> | </span>}
            {gradeLevel && <span> {gradeLevel}</span>}
          </p>
          {createdAt && (
            <p className="text-md text-text-secondary">
              Created:{" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </div>

      {/* Render Analogies without Header */}
      <div className="w-full max-w-4xl">
        <Analogies analogies={analogies} showHeader={false} />
      </div>
    </div>
  );
}
