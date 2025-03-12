"use client";

import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import Button from "@/app/shared/components/Button";
import Card from "@/app/shared/components/Card";

export default function NoLaunchedQuizzes() {
  return (
    <Card
      variant="outline"
      rounded="rounded-3xl"
      className="mt-16 flex flex-col items-center text-center space-y-6"
    >
      {/* 📌 Large Icon - Friendly & Inviting */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
        <PlusIcon className="w-12 h-12 " />
      </div>

      {/* 📝 Large, Clear Message */}
      <h2 className="text-3xl font-black font-sans text-gray-900">
        No Launched Quizzes Yet
      </h2>

      {/* ✨ Friendly, Encouraging Description */}
      <p className="text-gray-600 max-w-md text-lg">
        Get started by launching your first quiz and tracking student progress
        with AI-powered insights.
      </p>

      {/* 🚀 Clean, High-Impact CTA Using Our Custom Button */}
      <Link href="/dashboard/create-quiz">
        <Button
          size="large"
          label="Launch Your First Quiz"
          iconLeft={<PlusIcon className="w-5 h-5" />} // ✅ New Left Icon Support
        />
      </Link>
    </Card>
  );
}
