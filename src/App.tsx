import { useEffect, useMemo, useState } from "react";
import ScenarioCard from "./components/ScenarioCard";
import ResultsChart from "./components/ResultsChart";
import { aggregateRatingsByScenario } from "./utils/aggregateRatings";
import {
  listResponses,
  listScenarios,
  submitResponse,
} from "./lib/db/responsesRepository";
import type { RatingInput, ResponseRow, Scenario } from "./lib/db/types";
import "./styles.css";

export default function App() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [responses, setResponses] = useState<ResponseRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoading(true);
        const [scenarioData, responseData] = await Promise.all([
          listScenarios(),
          listResponses(),
        ]);
        setScenarios(scenarioData);
        setResponses(responseData);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load data.";
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    }

    void loadInitialData();
  }, []);

  async function handleSubmitRating(newRating: RatingInput) {
    try {
      await submitResponse(newRating);
      const updatedResponses = await listResponses();
      setResponses(updatedResponses);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit response.";
      setErrorMessage(message);
    }
  }

  const results = useMemo(() => {
    return aggregateRatingsByScenario(scenarios, responses);
  }, [scenarios, responses]);

  if (isLoading) {
    return <main className="app">Loading...</main>;
  }

  return (
    <main className="app">
      <header className="hero">
        <h1>AI Morality Map</h1>
        <p>Explore how students judge different uses of AI in academic life.</p>
      </header>

      {errorMessage ? <p>{errorMessage}</p> : null}

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
