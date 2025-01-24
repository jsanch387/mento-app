import ErrorMessage from "@/app/shared/components/ErrorMessage";
import MyItemsList from "@/app/features/my-items/MyItemsList";
import { createServerApiClient } from "@/app/lib/utils/api/serverApiClient";
import Button from "@/app/shared/components/Button";
import Card from "@/app/shared/components/Card";
import Link from "next/link";

export default async function MyItemsPage() {
  let items = [];
  let error: string | null = null;

  try {
    const apiClient = await createServerApiClient();
    const response = await apiClient.get("/items");
    items = response.data; // Backend response: [{ itemType, count }]
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(
        "Error fetching user items:",
        err.message || "Unknown error"
      );
      error = err.message || "An unknown error occurred.";
    } else {
      console.error("Unexpected error:", err);
      error = "An unexpected error occurred.";
    }
  }

  return (
    <div className="min-h-screen flex flex-col mt-10 items-start px-4 sm:px-8">
      {/* Left-aligned heading */}
      <h1 className="text-3xl sm:text-4xl font-black font-sans mb-10 text-left">
        My Items
      </h1>

      {/* If there's an error, display the error message */}
      {error ? (
        <ErrorMessage error={error} />
      ) : items.length > 0 ? (
        <MyItemsList items={items} />
      ) : (
        <Card className="flex mx-auto flex-col items-center text-center w-full max-w-lg">
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
