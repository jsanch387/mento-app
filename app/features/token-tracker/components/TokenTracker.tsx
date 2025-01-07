"use client";

import React, { useEffect, useState } from "react";
import {
  ExclamationCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import { getUserTokens } from "../../settings/components/api/user-api";
import useTokenStore from "../store/tokenStore";
import LoadingSpinner from "@/app/shared/components/LoadingSpinner";

export default function TokenTracker() {
  const { tokens, setTokens } = useTokenStore();
  const [error, setError] = useState<string | null>(null); // Manage error state
  const [loading, setLoading] = useState(false); // Manage loading state

  useEffect(() => {
    async function fetchTokens() {
      setLoading(true); // Start loading spinner
      try {
        console.log("Fetching tokens...");

        const tokenCount = await getUserTokens();
        console.log("Tokens:", tokenCount);

        if (tokenCount === null) {
          setTokens(null); // Unlimited tokens
        } else {
          setTokens(tokenCount);
        }

        setError(null); // Clear previous errors
      } catch (err) {
        console.error("Error fetching tokens:", err);

        // Provide user-friendly error message
        setError(
          "Unable to fetch tokens. Please check your connection and try again."
        );
      } finally {
        setLoading(false); // Stop loading spinner
      }
    }

    // Fetch tokens only if they haven't been set
    if (tokens === undefined) {
      fetchTokens();
    }
  }, [setTokens, tokens]);

  const handleRetry = () => {
    setError(null); // Clear error state
    setTokens(undefined); // Reset token state to trigger fetch
  };

  return (
    <div className="flex items-center px-4 py-2 text-sm text-gray-500">
      {loading ? (
        <LoadingSpinner size="small" />
      ) : error ? (
        <div className="flex items-center space-x-2 text-red-500">
          <ExclamationCircleIcon className="h-6 w-6" aria-hidden="true" />
          <span className="font-semibold">{error}</span>
          <button
            onClick={handleRetry}
            className="flex items-center space-x-1 text-primary underline"
          >
            <ArrowPathIcon className="h-4 w-4" />
            <span>Retry</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Credits:</span>
          <span className="font-bold text-primary text-lg">
            {tokens !== null ? tokens : "Unlimited"}
          </span>
        </div>
      )}
    </div>
  );
}
