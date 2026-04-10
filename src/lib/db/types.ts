export type Scenario = {
  id: string;
  title: string;
  category: string;
  description: string;
  created_at?: string;
};

export type RatingInput = {
  scenarioId: string;
  learningImpact: number;
  fairness: number;
  reasons: string[];
};

export type ResponseRow = {
  id: string;
  scenario_id: string;
  learning_impact: number;
  fairness: number;
  created_at: string;
};

export type ScenarioResult = {
  scenarioId: string;
  title: string;
  category: string;
  count: number;
  avgLearningImpact: number;
  avgFairness: number;
  controversyScore: number;
};
