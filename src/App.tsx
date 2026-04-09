import { useMemo, useState } from "react";
import { scenarios } from "./data/scenarios";
import ScenarioCard from "./components/ScenarioCard";
import ResultsChart from "./components/ResultsChart";
import { aggregateRatingsByScenario } from "./utils/aggregateRatings";
import "./styles.css";

export default function App() {
  const [ratings, setRatings] = useState([]);

  function handleSubmitRating(newRating) {
    setRatings((prev) => [...prev, newRating]);
  }

  const results = useMemo(() => {
    return aggregateRatingsByScenario(scenarios, ratings);
  }, [ratings]);

  return (
    <main className="app">
      <header className="hero">
        <h1>AI Morality Map</h1>
        <p>
          Explore how students judge different uses of AI in academic life.
        </p>
      </header>

      <section className="panel">
        <h2>Rate scenarios</h2>
        <div className="scenario-grid">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onSubmit={handleSubmitRating}
            />
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Live results</h2>
        <ResultsChart results={results} />
      </section>
    </main>
  );
}
