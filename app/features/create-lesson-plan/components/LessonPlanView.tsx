"use client";

import React from "react";
import MarkdownIt from "markdown-it";
import { LessonPlanResponse } from "../types/types"; // ✅ Import your types

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});

// ✅ Use Pick to keep it clean and consistent with your types
const LessonPlanView = ({ content }: Pick<LessonPlanResponse, "content">) => {
  if (!content) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <article
        className="prose prose-md prose-blue max-w-none prose-headings:font-black prose-headings:font-sans"
        dangerouslySetInnerHTML={{ __html: md.render(content) }}
      />
    </div>
  );
};

export default LessonPlanView;
