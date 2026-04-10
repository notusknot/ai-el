import { useEffect, useMemo, useState } from "react";
import ScenarioCard from "./components/ScenarioCard";
import ResultsChart from "./components/ResultsChart";
import { aggregateRatingsByScenario } from "./utils/aggregateRatings";
import {
  listResponses,
  listScenarios,
  submitResponse,
  subscribeToResponseInserts,
} from "./lib/db/responsesRepository";
import { supabase } from "./lib/db/client";
import type { RatingInput, ResponseRow, Scenario } from "./lib/db/types";

export default function App() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [responses, setResponses] = useState<ResponseRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

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

  useEffect(() => {
    const channel = subscribeToResponseInserts(async () => {
      try {
        const updatedResponses = await listResponses();
        setResponses(updatedResponses);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to refresh live responses.";
        setErrorMessage(message);
      }
    });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  async function handleSubmitRating(newRating: RatingInput) {
    try {
      setErrorMessage("");
      setSubmitStatus("");

      await submitResponse(newRating);

      const updatedResponses = await listResponses();
      setResponses(updatedResponses);

      setSubmitStatus("Your response was recorded.");

      window.setTimeout(() => {
        setSubmitStatus("");
      }, 2500);
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

      {errorMessage ? <p className="status error">{errorMessage}</p> : null}
      {submitStatus ? <p className="status success">{submitStatus}</p> : null}

      <div className="main-grid">
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

        <section className="panel results-panel">
          <h2>Live results</h2>
          <ResultsChart results={results} />
        </section>
      </div>
    </main>
  );
}
