"use server";

import { predictBidderActions } from "@/ai/flows/predict-bidder-actions";
import type { PredictBidderActionsInput } from "@/ai/flows/predict-bidder-actions";

export async function getBidderPrediction(input: PredictBidderActionsInput) {
  try {
    const prediction = await predictBidderActions(input);
    return prediction;
  } catch (error) {
    console.error("Error getting bidder prediction:", error);
    // Return a default/error state
    return {
      predictedAction: "Error",
      confidence: 0,
      reason: "Could not get prediction.",
    };
  }
}
