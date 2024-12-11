import { Baloo } from "@/app/fonts/fonts";
import React from "react";

interface TextLogoProps {
  color?: "primary" | "white"; // Specify the supported colors
}

export default function TextLogo({ color = "primary" }: TextLogoProps) {
  const textColor = color === "primary" ? "text-primary" : "text-white";

  return (
    <div className={`${Baloo.className} font-bold text-4xl ${textColor}`}>
      Mento
    </div>
  );
}
