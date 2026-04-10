export const scenarios = [
  {
    id: "practice-questions",
    title: "Generate practice questions",
    category: "study support",
    description:
      "A student uses AI to generate practice quiz questions from their lecture notes."
  },
  {
    id: "grammar-revision",
    title: "Revise grammar and clarity",
    category: "writing assistance",
    description:
      "A student writes their own paragraph and uses AI to improve grammar and clarity."
  },
  {
    id: "reading-summary",
    title: "Summarize an unread article",
    category: "reading support",
    description:
      "A student asks AI to summarize a reading they did not actually read."
  },
  {
    id: "essay-draft",
    title: "Draft part of an essay",
    category: "writing assistance",
    description:
      "A student asks AI to draft a body paragraph for a graded essay they will submit."
  },
  {
    id: "debug-after-trying",
    title: "Debug code after trying first",
    category: "coding help",
    description:
      "A student attempts a programming assignment and then uses AI to help debug their code."
  },
  {
    id: "complete-homework",
    title: "Complete homework directly",
    category: "assignment completion",
    description:
      "A student uploads a homework problem and copies the AI answer with little or no revision."
  }
];

export const reasonOptions = [
  { id: "helps-learning", label: "Helps learning" },
  { id: "harms-learning", label: "Harms learning" },
  { id: "fair", label: "Fair" },
  { id: "unfair", label: "Unfair" },
  { id: "saves-time", label: "Saves time" },
  { id: "misrepresents-work", label: "Misrepresents work" },
  { id: "accessibility", label: "Supports accessibility" },
  { id: "should-disclose", label: "Should be disclosed" }
];
