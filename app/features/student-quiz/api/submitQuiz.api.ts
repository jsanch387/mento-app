import apiClient from "@/app/lib/utils/api/apiClient";

interface SubmitQuizParams {
  studentName: string;
  deploymentId?: string;
  answers: {
    question: string;
    studentAnswer: string;
    correctAnswer: string;
    type: string;
  }[];
}

export async function submitQuiz(submissionData: SubmitQuizParams) {
  console.log("📤 Submitting quiz data:", submissionData);

  const response = await apiClient.post("/quizzes/grade", submissionData);

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to grade quiz.");
  }

  console.log("✅ Full Grading Response:", response.data);

  return response.data.gradedAnswers;
}
