// interface LessonPlan {
//   title: string;
//   overview: {
//     gradeLevel: string;
//     subject: string;
//     duration: string;
//     standards: string;
//   };
//   materials: string[];
//   learningObjectives: string[];
//   lessonPlanStructure: {
//     engage: { time: string; description: string };
//     explore: { time: string; description: string };
//     explain: { time: string; description: string };
//     elaborate: { time: string; description: string };
//     evaluate: { time: string; description: string };
//   };
// }

// export interface CreateLessonPlanResponse {
//   lessonPlan: LessonPlan;
// }

// 🔹 Request Payload Type
export interface GenerateLessonPlanRequest {
  gradeLevel: string;
  subject: string;
  duration: string;
  additionalDetails?: string;
}

// 🔹 Response Type
export interface LessonPlanResponse {
  id: string;
  title: string;
  content: string;
  grade_level: string;
  subject: string;
  duration: string;
  additional_details: string;
  created_at: string;
}
