"use client";

import React, { useEffect } from "react";
import { getUserTokens } from "../../settings/components/api/user-api";
import useTokenStore from "../store/tokenStore";
import LoadingSpinner from "@/app/shared/components/LoadingSpinner";

export default function TokenTracker() {
  const { tokens, setTokens } = useTokenStore();

  useEffect(() => {
    async function fetchTokens() {
      // Fetch tokens only if tokens are undefined or a specific value
      if (tokens === undefined) {
        try {
          const tokenCount = await getUserTokens();

          // If the API response indicates unlimited tokens, keep it as `null`
          if (tokenCount === null) {
            setTokens(null); // Set as null explicitly for clarity
          } else {
            setTokens(tokenCount);
          }
        } catch (error) {
          console.error("Error fetching tokens:", error);
        }
      }
    }

    fetchTokens();
  }, [tokens, setTokens]); // Dependencies ensure the effect runs only when `tokens` or `setTokens` changes

  return (
    <div className="flex items-center justify-between px-4 mb-4 text-text-secondary">
      <span className="font-medium">Credits Remaining:</span>
      {tokens !== undefined ? (
        tokens !== null ? (
          <span className="font-bold text-xl text-primary">{tokens}</span>
        ) : (
          <span className="font-bold text-md text-primary">Unlimited</span>
        )
      ) : (
        <LoadingSpinner size="small" />
      )}
    </div>
  );
}
