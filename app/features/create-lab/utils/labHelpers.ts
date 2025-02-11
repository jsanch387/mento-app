import { Lab } from "../types/Lab.types";

export const generateCopyText = (lab: Lab) => {
  return {
    plainText: `
  🧪 ${lab.title}
  
  STANDARDS ALIGNMENT
  ${lab.standards_alignment}
  
  DURATION: ${lab.duration}
  
  OVERVIEW
  ${lab.overview}
  
  MATERIALS
  ${lab.materials.map((item) => `- ${item}`).join("\n")}
  
  LEARNING OBJECTIVES
  ${lab.learning_objectives.map((obj) => `- ${obj}`).join("\n")}
  
  PROCEDURE
  ${lab.procedure.map((step) => ` ${step}`).join("\n")}
  
  DISCUSSION QUESTIONS
  ${lab.discussion_questions
    .map(
      (q) =>
        `Q: ${q.question}\nAnswer: ${q.answer}\nExplanation: ${q.explanation}`
    )
    .join("\n\n")}
  
  EXTENSIONS
  ${lab.extensions.map((ext) => `- ${ext}`).join("\n")}
  
  SAFETY NOTES
  ${lab.safety_notes}
    `,
    htmlText: `
  <h1>🧪 ${lab.title}</h1>
  <strong>Standards Alignment:</strong> ${lab.standards_alignment}<br/>
  <strong>Duration:</strong> ${lab.duration}<br/><br/>
  <strong>Overview:</strong><br/>${lab.overview}<br/><br/>
  <strong>Materials:</strong><br/>${lab.materials
    .map((item) => `- ${item}`)
    .join("<br/>")}<br/><br/>
  <strong>Learning Objectives:</strong><br/>${lab.learning_objectives
    .map((obj) => `- ${obj}`)
    .join("<br/>")}<br/><br/>
  <strong>Procedure:</strong><br/>${lab.procedure
    .map((step) => ` ${step}`)
    .join("<br/>")}<br/><br/>
  <strong>Discussion Questions:</strong><br/>${lab.discussion_questions
    .map(
      (q) => `
  <strong>Q:</strong> ${q.question}<br/>
  <strong>Answer:</strong> ${q.answer}<br/>
  <strong>Explanation:</strong> ${q.explanation}<br/><br/>`
    )
    .join("")}
  <strong>Extensions:</strong><br/>${lab.extensions
    .map((ext) => `- ${ext}`)
    .join("<br/>")}<br/><br/>
  <strong>Safety Notes:</strong><br/>${lab.safety_notes}
    `,
  };
};

export const handleCopyLabDetails = (lab: Lab) => {
  const { plainText, htmlText } = generateCopyText(lab);

  navigator.clipboard
    .write([
      new ClipboardItem({
        "text/plain": new Blob([plainText], { type: "text/plain" }),
        "text/html": new Blob([htmlText], { type: "text/html" }),
      }),
    ])
    .then(() => alert("Copied lab details to clipboard!"))
    .catch((err) => console.error("Copy failed", err));
};
