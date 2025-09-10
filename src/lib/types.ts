export type Currency = 'NGN' | 'USD' | 'EUR';

export type Bid = {
  bidderId: string;
  amount: number;
  timestamp: number;
};

export type Bidder = {
  id: string;
  name: string;
  currentBid: number;
  isWinning: boolean;
  predictedAction?: string;
  confidence?: number;
};

export type AuctionConfig = {
  numBidders: number;
  currency: Currency;
  minBid: number;
  bidIncrement: number;
  duration: number; // in seconds
};

export type AuctionState = {
  config: AuctionConfig;
  bidders: Bidder[];
  bidHistory: Bid[];
  timeLeft: number;
  highestBid: number;
  status: 'configuring' | 'running' | 'ended';
  winner: Bidder | null;
};
