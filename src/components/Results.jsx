import { aggregateRatingsByScenario } from "../utils/aggregateRatings";

export default function ResultsChart({ scenarios, ratings }) {
  const results = aggregateRatingsByScenario(scenarios, ratings);

  return (
    <div>
      <h2>Live Results</h2>
      {results.map((result) => (
        <div key={result.scenarioId} className="result-row">
          <strong>{result.title}</strong>
          <div>Responses: {result.count}</div>
          <div>Avg learning impact: {result.avgLearningImpact.toFixed(2)}</div>
          <div>Avg fairness: {result.avgFairness.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
