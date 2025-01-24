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
    const response = await apiClient.post("/analogies", {
      gradeLevel,
      subject,
      context,
    });

    // Validate that the response contains the `analogies` object
    if (!response.data.analogies) {
      throw new Error("Invalid API response: Missing 'analogies' field.");
    }

    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating analogies:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to create analogies"
    );
  }
};
