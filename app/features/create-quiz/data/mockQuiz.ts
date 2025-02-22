import { Quiz } from "../types/quiz.types";

export const mockQuiz: Quiz = {
  title: "Quiz on Photosynthesis",
  grade_level: "5th Grade",
  subject: "Photosynthesis",
  number_of_questions: 5,
  question_types: [
    "multiple_choice",
    "short_answer",
    "true_false",
    "fill_in_the_blank",
  ],
  user_id: "mock-user-id",
  id: "mock-quiz-id",
  created_at: new Date().toISOString(),
  quiz_content: [
    {
      question: "Why do plants perform photosynthesis?",
      type: "multiple_choice",
      options: [
        "A. To grow",
        "B. To produce food",
        "C. To sleep",
        "D. To see the sun",
      ],
      correct_answer: "To produce food",
      explanation:
        "Plants use photosynthesis to create energy (food) for growth.",
      hint: "Think about why you eat food.",
    },
    {
      question:
        "What do plants produce during photosynthesis that humans need?",
      type: "short_answer",
      correct_answer: "Oxygen",
      explanation:
        "Plants release oxygen, which is essential for human survival.",
      hint: "This is something we breathe.",
    },
    {
      question: "True or False: Photosynthesis happens only during the day.",
      type: "true_false",
      correct_answer: "True",
      explanation:
        "Photosynthesis requires sunlight, so it only occurs during daylight hours.",
      hint: "Think about when plants have access to sunlight.",
    },
    {
      question:
        "Fill in the blank: Photosynthesis takes place in the ________ of the plant cell.",
      type: "fill_in_the_blank",
      correct_answer: "Chloroplast",
      explanation:
        "Chloroplasts are the organelles where photosynthesis occurs.",
      hint: "This organelle contains chlorophyll.",
    },
    {
      question: "Which of these is NOT needed for photosynthesis?",
      type: "multiple_choice",
      options: ["A. Sunlight", "B. Carbon Dioxide", "C. Water", "D. Music"],
      correct_answer: "Music",
      explanation:
        "Sunlight, carbon dioxide, and water are needed for photosynthesis, not music.",
      hint: "Which of these things do plants NOT need to survive?",
    },
  ],
  teaching_insights:
    "This quiz covers key concepts about photosynthesis using various question types to engage different levels of critical thinking.",
};
