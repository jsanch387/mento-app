import apiClient from "@/app/lib/utils/api/apiClient";

export interface CheckLaunchedQuizResponse {
  exists: boolean;
  deploymentLink?: string;
  qrCodeData?: string;
  launchId?: string;
  className?: string;
  createdAt?: string;
}

export const checkLaunchedQuiz = async (
  quizId: string
): Promise<CheckLaunchedQuizResponse> => {
  const response = await apiClient.get<CheckLaunchedQuizResponse>(
    `/quizzes/${quizId}/launch-status`
  );
  return response.data;
};
