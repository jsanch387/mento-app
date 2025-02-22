export interface Quiz {
  title: string;
  grade_level: string;
  subject: string;
  number_of_questions: number;
  question_types: QuestionType[]; // Uses enum for strict typing
  quiz_content: QuizQuestion[]; // Merged answer key into quiz content
  teaching_insights: string;
  user_id: string;
  id: string;
  created_at: string;
}

// Enum for allowed question types
export type QuestionType =
  | "multiple_choice"
  | "short_answer"
  | "true_false"
  | "fill_in_the_blank";

export interface QuizQuestion {
  question: string;
  type: QuestionType;

  // Multiple-choice options as an array of strings, optional for other types
  options?: string[];

  // Correct answer directly in the question object
  correct_answer: string;

  // Explanation for why the answer is correct
  explanation: string;

  // Hints can be included or excluded
  hint?: string;
}
