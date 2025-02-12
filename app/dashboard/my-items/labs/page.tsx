import LabList from "@/app/features/my-items/LabList";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

interface Preview {
  id: string;
  title: string;
  subject: string;
  grade_level: string;
  created_at: string;
}

export default async function LabsPage() {
  let previews: Preview[] = [];

  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get("/items/preview/labs");

    // Map response data to preview format
    previews = response.data.previews.map((preview: Preview) => ({
      id: preview.id,
      title: preview.title,
      subject: preview.subject,
      grade_level: preview.grade_level,
      created_at: preview.created_at,
    }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching lab previews:", error.message);
    } else {
      console.error("Error fetching lab previews:", error);
    }
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-black font-sans mb-6">Labs</h1>
      <LabList previews={previews} />
    </div>
  );
}
