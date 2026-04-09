export default function ResultsChart({ results }) {
  return (
    <div className="results-list">
      {results.map((result) => (
        <article key={result.scenarioId} className="result-card">
          <h3>{result.title}</h3>
          <p>Responses: {result.count}</p>
          <p>Average learning impact: {result.avgLearningImpact.toFixed(2)}</p>
          <p>Average fairness: {result.avgFairness.toFixed(2)}</p>
        </article>
      ))}
    </div>
  );
}
