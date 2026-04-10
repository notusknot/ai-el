import type { ResponseRow, Scenario, ScenarioResult } from "../lib/db/types";

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
      };
    }

    const avgLearningImpact =
      scenarioResponses.reduce(
        (sum, response) => sum + response.learning_impact,
        0
      ) / scenarioResponses.length;

    const avgFairness =
      scenarioResponses.reduce((sum, response) => sum + response.fairness, 0) /
      scenarioResponses.length;

    return {
      scenarioId: scenario.id,
      title: scenario.title,
      category: scenario.category,
      count: scenarioResponses.length,
      avgLearningImpact,
      avgFairness,
    };
  });
}
