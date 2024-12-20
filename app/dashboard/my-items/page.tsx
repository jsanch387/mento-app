import MyItemsList from "@/app/features/my-items/MyItemsList";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";

export default async function MyItemsPage() {
  let items = [];

  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get("/items");
    items = response.data; // Backend response: [{ itemType, count }]
  } catch (error: any) {
    console.error("Error fetching user items:", error.message);
  }

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <div className="mt-10 ">
        <h1 className="text-4xl font-bold mb-10">My Items</h1>
        <MyItemsList items={items} />
      </div>
    </div>
  );
}
