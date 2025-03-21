import apiClient from "@/app/lib/utils/api/apiClient";

export async function verifyAccessCode(
  deploymentId: string,
  accessCode: string
): Promise<void> {
  const response = await apiClient.get(
    `/quizzes/verify-access/${deploymentId}/${accessCode}`
  );

  if (response.status !== 200) {
    throw new Error("Invalid access code.");
  }
}
