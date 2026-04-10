import type { ResponseRow, Scenario, ScenarioResult } from "../lib/db/types";

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function meanAbsoluteDeviation(values: number[]): number {
  if (values.length === 0) return 0;
  const avg = average(values);
  return (
    values.reduce((sum, value) => sum + Math.abs(value - avg), 0) / values.length
  );
}

export function aggregateRatingsByScenario(
  scenarios: Scenario[],
  responses: ResponseRow[]
): ScenarioResult[] {
  return scenarios.map((scenario) => {
    const scenarioResponses = responses.filter(
      (response) => response.scenario_id === scenario.id
    );

    if (scenarioResponses.length === 0) {
      return {
        scenarioId: scenario.id,
        title: scenario.title,
        category: scenario.category,
        count: 0,
        avgLearningImpact: 0,
        avgFairness: 0,
        controversyScore: 0,
      };
    }

    const learningValues = scenarioResponses.map(
      (response) => response.learning_impact
    );
    const fairnessValues = scenarioResponses.map((response) => response.fairness);

    const avgLearningImpact = average(learningValues);
    const avgFairness = average(fairnessValues);

    const learningSpread = meanAbsoluteDeviation(learningValues);
    const fairnessSpread = meanAbsoluteDeviation(fairnessValues);

    return {
      scenarioId: scenario.id,
      title: scenario.title,
      category: scenario.category,
      count: scenarioResponses.length,
      avgLearningImpact,
      avgFairness,
      controversyScore: (learningSpread + fairnessSpread) / 2,
    };
  });
}
