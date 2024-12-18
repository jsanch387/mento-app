"use client";

import React, { useState } from "react";

interface StarRatingProps {
  rating: number; // Current rating value
  onRate: (rating: number) => void; // Callback to handle rating selection
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRate(star)}
          className={`cursor-pointer text-4xl ${
            (hoverRating || rating) >= star
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
