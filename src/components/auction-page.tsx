"use client";

import { useState } from "react";
import type { AuctionConfig } from "@/lib/types";
import AuctionSetup from "@/components/auction-setup";
import LiveBiddingDashboard from "@/components/live-bidding-dashboard";
import Header from "@/components/header";

const initialConfig: AuctionConfig = {
  numBidders: 5,
  currency: "USD",
  minBid: 25000,
  bidIncrement: 500,
  duration: 300, // 5 minutes
};

export default function AuctionPage() {
  const [auctionState, setAuctionState] = useState<'configuring' | 'running'>('configuring');
  const [config, setConfig] = useState<AuctionConfig>(initialConfig);

  const handleStartAuction = (newConfig: AuctionConfig) => {
    setConfig(newConfig);
    setAuctionState('running');
  };

  const handleRestart = () => {
    setAuctionState('configuring');
    // Optionally reset config to initial state
    // setConfig(initialConfig);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Header />
      <div className="mt-8">
        {auctionState === 'configuring' ? (
          <AuctionSetup
            initialConfig={config}
            onStartAuction={handleStartAuction}
          />
        ) : (
          <LiveBiddingDashboard config={config} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}
