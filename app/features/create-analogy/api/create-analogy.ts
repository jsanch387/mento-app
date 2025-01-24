import apiClient from "@/app/lib/utils/api/apiClient";

export interface CreateAnalogyResponse {
  analogies: {
    analogy1: {
      title: string;
      analogy: string;
      subject: string;
      gradeLevel: string;
    };
    analogy2: {
      title: string;
      analogy: string;
      subject: string;
      gradeLevel: string;
    };
  };
}

export const createAnalogy = async ({
  gradeLevel,
  subject,
  context,
}: {
  gradeLevel: string;
  subject: string;
  context: string;
}): Promise<CreateAnalogyResponse> => {
  try {
    const response = await apiClient.post<CreateAnalogyResponse>("/analogies", {
      gradeLevel,
      subject,
      context,
    });

    // Validate that the response contains the `analogies` object
    if (!response.data.analogies) {
      throw new Error("Invalid API response: Missing 'analogies' field.");
    }

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };

      console.error(
        "Error creating analogies:",
        axiosError.response?.data || error.message
      );
      throw new Error(
        axiosError.response?.data?.message || "Failed to create analogies"
      );
    }

    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred.");
  }
};
