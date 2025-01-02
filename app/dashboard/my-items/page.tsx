import MyItemsList from "@/app/features/my-items/MyItemsList";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";
import Button from "@/app/shared/components/Button";
import Card from "@/app/shared/components/Card";
import Link from "next/link";

export default async function MyItemsPage() {
  let items = [];

  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get("/items");
    items = response.data; // Backend response: [{ itemType, count }]
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching user items:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <h1 className="text-4xl font-bold mb-20 text-center">My Items</h1>
      {items.length > 0 ? (
        <MyItemsList items={items} />
      ) : (
        <Card className="flex flex-col items-center text-center ">
          <p className="text-xl text-text-secondary mb-10">
            It looks like you haven&apos;t created anything yet.
            <br /> Let&apos;s get started!
          </p>
          <Link href="/dashboard">
            <Button label="Create Item" size="large" />
          </Link>
        </Card>
      )}
    </div>
  );
}
