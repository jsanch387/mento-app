"use client";

import React from "react";

const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="mt-4 p-4 border rounded bg-red-100 text-red-800">
      <p className="text-md font-semibold">Error: {error}</p>
    </div>
  );
};

export default ErrorMessage;
