export function aggregateRatingsByScenario(scenarios, ratings) {
  return scenarios.map((scenario) => {
    const scenarioRatings = ratings.filter(
      (rating) => rating.scenarioId === scenario.id
    );

    if (scenarioRatings.length === 0) {
      return {
        scenarioId: scenario.id,
        title: scenario.title,
        category: scenario.category,
        count: 0,
        avgLearningImpact: 0,
        avgFairness: 0
      };
    }

    const avgLearningImpact =
      scenarioRatings.reduce((sum, rating) => sum + rating.learningImpact, 0) /
      scenarioRatings.length;

    const avgFairness =
      scenarioRatings.reduce((sum, rating) => sum + rating.fairness, 0) /
      scenarioRatings.length;

    return {
      scenarioId: scenario.id,
      title: scenario.title,
      category: scenario.category,
      count: scenarioRatings.length,
      avgLearningImpact,
      avgFairness
    };
  });
}
