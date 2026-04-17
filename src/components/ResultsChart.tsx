import type { ScenarioResult } from "../lib/db/types";
import MoralMap from "./MoralMap";

type ResultsChartProps = {
  results: ScenarioResult[];
};

export default function ResultsChart({ results }: ResultsChartProps) {
  const controversialResults = [...results]
    .filter((result) => result.count > 1)
    .sort((a, b) => b.controversyScore - a.controversyScore)
    .slice(0, 3);

  return (
    <div className="results-layout">
      <section className="results-summary">
        <h3>Moral map</h3>
        <p className="results-explainer">
          Each point shows one scenario. Left to right is harmful to helpful for
          learning, and bottom to top is unfair to fair.
        </p>
        <MoralMap results={results} />
      </section>

      <section className="results-summary">
        <h3>Most controversial</h3>
        {controversialResults.length === 0 ? (
          <p>More responses are needed before disagreement patterns appear.</p>
        ) : (
          <div className="results-list">
            {controversialResults.map((result) => (
              <article key={result.scenarioId} className="result-card featured">
                <h4>{result.title}</h4>
                <p>Responses: {result.count}</p>
                <p>Controversy score: {result.controversyScore.toFixed(2)}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="results-summary">
        <h3>All scenarios</h3>
        <div className="results-list">
          {results.map((result) => (
            <article key={result.scenarioId} className="result-card">
              <h4>{result.title}</h4>
              <p>Responses: {result.count}</p>
              <p>Average learning impact: {result.avgLearningImpact.toFixed(2)}</p>
              <p>Average fairness: {result.avgFairness.toFixed(2)}</p>
              <p>Controversy score: {result.controversyScore.toFixed(2)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
