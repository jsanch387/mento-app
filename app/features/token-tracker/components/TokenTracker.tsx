"use client";

import React, { useEffect } from "react";
import { getUserTokens } from "../../settings/components/api/user-api";
import useTokenStore from "../store/tokenStore";

export default function TokenTracker() {
  const { tokens, setTokens } = useTokenStore();

  useEffect(() => {
    async function fetchTokens() {
      if (tokens === null) {
        try {
          const tokenCount = await getUserTokens();
          setTokens(tokenCount);
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
      {tokens !== null ? (
        <span className="font-bold text-xl text-primary">{tokens}</span>
      ) : (
        <span className="font-bold text-primary">Loading...</span>
      )}
    </div>
  );
}
