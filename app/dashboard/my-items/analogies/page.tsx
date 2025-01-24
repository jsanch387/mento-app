import AnalogyGroupList from "@/app/features/my-items/AnalogyGroupList";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

export default async function AnalogiesPage() {
  let previews = [];

  try {
    // Fetch analogy group previews server-side
    const apiClient = await createServerApiClient();
    const response = await apiClient.get("/items/preview/analogies");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    previews = response.data.previews.map((preview: any) => ({
      id: preview.id,
      context: preview.context,
      subject: preview.subject,
      gradeLevel: preview.grade_level,
      createdAt: preview.created_at,
    }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching analogy group previews:", error.message);
    } else {
      console.error("Error fetching analogy group previews:", error);
    }
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-black font-sans mb-6">Analogies</h1>
      <AnalogyGroupList previews={previews} />
    </div>
  );
}
