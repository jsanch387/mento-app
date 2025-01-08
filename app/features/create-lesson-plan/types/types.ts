interface LessonPlan {
  title: string;
  overview: {
    gradeLevel: string;
    subject: string;
    duration: string;
    standards: string;
  };
  materials: string[];
  learningObjectives: string[];
  lessonPlanStructure: {
    engage: { time: string; description: string };
    explore: { time: string; description: string };
    explain: { time: string; description: string };
    elaborate: { time: string; description: string };
    evaluate: { time: string; description: string };
  };
}

export interface CreateLessonPlanResponse {
  lessonPlan: LessonPlan;
}
