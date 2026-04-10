import { useState } from "react";
import RatingSlider from "./RatingSlider";
import TagSelector from "./TagSelector";
import { reasonOptions } from "../data/scenarios";

export default function ScenarioCard({ scenario, onSubmit }) {
  const [learningImpact, setLearningImpact] = useState(0);
  const [fairness, setFairness] = useState(0);
  const [reasons, setReasons] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      scenarioId: scenario.id,
      learningImpact,
      fairness,
      reasons,
    });

    setLearningImpact(0);
    setFairness(0);
    setReasons([]);
  }

  return (
    <article className="card">
      <h3>{scenario.title}</h3>
      <p>{scenario.description}</p>
      <div className="category">{scenario.category}</div>

      <form onSubmit={handleSubmit}>
        <RatingSlider
          label="Learning impact"
          hint="Harms learning ← → Helps learning"
          value={learningImpact}
          onChange={setLearningImpact}
        />

        <RatingSlider
          label="Fairness"
          hint="Unfair ← → Fair"
          value={fairness}
          onChange={setFairness}
        />

        <TagSelector
          label="Why?"
          options={reasonOptions}
          selected={reasons}
          onChange={setReasons}
        />

        <button type="submit">Submit</button>
      </form>
    </article>
  );
}
