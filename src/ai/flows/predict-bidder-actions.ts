// This is a server-side file.
'use server';

/**
 * @fileOverview Predicts the next actions of bidders in an auction.
 * 
 * - predictBidderActions - Predicts the next actions of bidders in an auction.
 * - PredictBidderActionsInput - The input type for the predictBidderActions function.
 * - PredictBidderActionsOutput - The return type for the predictBidderActions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictBidderActionsInputSchema = z.object({
  auctionId: z.string().describe('The ID of the auction.'),
  bidderId: z.string().describe('The ID of the bidder.'),
  currentBid: z.number().describe('The current bid amount.'),
  timeRemaining: z.number().describe('The time remaining in the auction in seconds.'),
  bidHistory: z.array(z.object({
    bidderId: z.string(),
    bidAmount: z.number(),
    timestamp: z.number(),
  })).describe('The bidding history of the auction.'),
});
export type PredictBidderActionsInput = z.infer<typeof PredictBidderActionsInputSchema>;

const PredictBidderActionsOutputSchema = z.object({
  predictedAction: z.string().describe('The predicted next action of the bidder.'),
  confidence: z.number().describe('The confidence level of the prediction (0-1).'),
  reason: z.string().describe('The reasoning behind the prediction.'),
});
export type PredictBidderActionsOutput = z.infer<typeof PredictBidderActionsOutputSchema>;

export async function predictBidderActions(input: PredictBidderActionsInput): Promise<PredictBidderActionsOutput> {
  return predictBidderActionsFlow(input);
}

const predictBidderActionsPrompt = ai.definePrompt({
  name: 'predictBidderActionsPrompt',
  input: {schema: PredictBidderActionsInputSchema},
  output: {schema: PredictBidderActionsOutputSchema},
  prompt: `You are an AI assistant that predicts the next action of a bidder in an auction.

  Given the following information about the auction and the bidder, predict the bidder's next action and the confidence level of your prediction.

  Auction ID: {{{auctionId}}}
  Bidder ID: {{{bidderId}}}
  Current Bid: {{{currentBid}}}
  Time Remaining: {{{timeRemaining}}}
  Bid History: {{#each bidHistory}}{{{bidderId}}}: {{{bidAmount}}} at {{{timestamp}}}{{#unless @last}}, {{/unless}}{{/each}}

  Consider the bidder's past behavior, the current state of the auction, and the time remaining.

  Possible actions include:
  - Place a higher bid
  - Wait and see
  - Drop out of the auction

  Output the predicted action, your confidence level (0-1), and the reasoning behind your prediction.

  Predicted Action: {{predictedAction}}
  Confidence: {{confidence}}
  Reason: {{reason}}`,
});

const predictBidderActionsFlow = ai.defineFlow(
  {
    name: 'predictBidderActionsFlow',
    inputSchema: PredictBidderActionsInputSchema,
    outputSchema: PredictBidderActionsOutputSchema,
  },
  async input => {
    const {output} = await predictBidderActionsPrompt(input);
    return output!;
  }
);
