import { StarIcon } from "@heroicons/react/16/solid";
import React from "react";

export default function MessageBanner() {
  return (
    <div className="w-full h-auto bg-white flex flex-col items-center justify-center space-y-2">
      <p className="text-black text-lg ">Teachers Favorite Planning App</p>
      <div className="flex space-x-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} className="h-6 w-6 text-yellow-400" />
        ))}
      </div>
    </div>
  );
}
