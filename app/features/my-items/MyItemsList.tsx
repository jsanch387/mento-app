"use client";

import Card from "@/app/shared/components/Card";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import BooksIcon from "@/public/books-icon.png";

interface MyItemsListProps {
  items: { itemType: string; count: number }[]; // Dynamic item list
}

const MyItemsList: React.FC<MyItemsListProps> = ({ items }) => {
  const router = useRouter();

  // A map to handle icons dynamically (you can expand this later)
  const iconMap: Record<string, StaticImageData> = {
    "Lesson Plans": BooksIcon,
    Analogies: BooksIcon,
    Quizzes: BooksIcon,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {items.map((item) => (
        <Card
          key={item.itemType}
          variant="outline"
          handleOnClick={() =>
            router.push(
              `/dashboard/my-items/${item.itemType
                .toLowerCase()
                .replace(" ", "-")}`
            )
          }
          className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col items-start min-w-[250px]"
        >
          <Image
            src={iconMap[item.itemType] || BooksIcon} // Default icon fallback
            alt={`${item.itemType} Icon`}
            width={60}
            height={60}
            className="mb-4"
          />
          <h2 className="text-xl font-bold mb-1">{item.itemType}</h2>
          <p className="text-gray-600 mb-4">{item.count} item(s)</p>
          <span className="text-blue-600 font-semibold">View All</span>
        </Card>
      ))}
    </div>
  );
};

export default MyItemsList;
