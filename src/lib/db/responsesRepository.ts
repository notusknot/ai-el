import { supabase } from "./client";
import type { RatingInput, ResponseRow, Scenario } from "./types";

export async function listScenarios(): Promise<Scenario[]> {
  const { data, error } = await supabase
    .from("scenarios")
    .select("*")
    .order("title");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function listResponses(): Promise<ResponseRow[]> {
  const { data, error } = await supabase
    .from("responses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function submitResponse(input: RatingInput): Promise<void> {
  const { data: insertedResponse, error: responseError } = await supabase
    .from("responses")
    .insert({
      scenario_id: input.scenarioId,
      learning_impact: input.learningImpact,
      fairness: input.fairness,
    })
    .select("id")
    .single();

  if (responseError) {
    throw new Error(responseError.message);
  }

  if (input.reasons.length > 0) {
    const { error: reasonsError } = await supabase
      .from("response_reasons")
      .insert(
        input.reasons.map((reasonKey) => ({
          response_id: insertedResponse.id,
          reason_key: reasonKey,
        }))
      );

    if (reasonsError) {
      throw new Error(reasonsError.message);
    }
  }
}
