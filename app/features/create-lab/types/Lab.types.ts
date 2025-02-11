export interface Lab {
  title: string;
  overview: string;
  materials: string[];
  learning_objectives: string[];
  procedure: string[];
  discussion_questions: {
    question: string;
    answer: string;
    explanation: string;
  }[];
  extensions: string[];
  safety_notes: string[];
  standards_alignment: string;
  context: string;
  duration: string;
}
