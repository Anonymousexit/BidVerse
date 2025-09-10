"use client";

import { useAuctionSimulation } from '@/hooks/use-auction-simulation';
import type { AuctionConfig } from '@/lib/types';
import BidderList from '@/components/bidder-list';
import BidHistory from '@/components/bid-history';
import AuctionDetails from '@/components/auction-details';
import AuctionWinner from '@/components/auction-winner';
import { Button } from './ui/button';
import { RefreshCcw } from 'lucide-react';

interface LiveBiddingDashboardProps {
  config: AuctionConfig;
  onRestart: () => void;
}

export default function LiveBiddingDashboard({ config, onRestart }: LiveBiddingDashboardProps) {
  const auction = useAuctionSimulation(config);

  if (auction.status === 'ended') {
    return <AuctionWinner winner={auction.winner} winningBid={auction.highestBid} currency={auction.displayCurrency} onRestart={onRestart} config={config} />;
  }

  return (
    <div className="space-y-8">
      <AuctionDetails auction={auction} config={config} />
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <BidderList bidders={auction.bidders} currency={auction.displayCurrency} config={config}/>
        </div>
        <div>
          <BidHistory bidHistory={auction.bidHistory} bidders={auction.bidders} currency={auction.displayCurrency} config={config}/>
        </div>
      </div>
       <div className="flex justify-center mt-8">
        <Button onClick={onRestart} variant="outline">
          <RefreshCcw />
          Configure New Auction
        </Button>
      </div>
    </div>
  );
}
