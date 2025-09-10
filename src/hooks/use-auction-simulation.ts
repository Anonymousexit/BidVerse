"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { AuctionConfig, Bidder, Bid, Currency } from '@/lib/types';
import { getBidderPrediction } from '@/app/actions';
import { formatCurrency, convertCurrency } from '@/lib/currency';

const firstNames = ["Alex", "Ben", "Charlie", "Dana", "Eva", "Frank", "Grace", "Henry", "Ivy", "Jack"];
const lastNames = ["S", "J", "W", "B", "D", "M", "T", "H", "P", "R"];
const generateBidderName = () => `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}.`;

export function useAuctionSimulation(config: AuctionConfig) {
  const { toast } = useToast();
  const [bidders, setBidders] = useState<Bidder[]>([]);
  const [bidHistory, setBidHistory] = useState<Bid[]>([]);
  const [timeLeft, setTimeLeft] = useState(config.duration);
  const [highestBid, setHighestBid] = useState(config.minBid);
  const [status, setStatus] = useState<'running' | 'ended'>('running');
  const [winner, setWinner] = useState<Bidder | null>(null);
  const [displayCurrency, setDisplayCurrency] = useState<Currency>(config.currency);

  const userBidderId = useMemo(() => 'user-bidder', []);

  useEffect(() => {
    const newBidders: Bidder[] = Array.from({ length: config.numBidders }, (_, i) => ({
      id: `bidder-${i}`,
      name: generateBidderName(),
      currentBid: 0,
      isWinning: false,
    }));
    newBidders.push({ id: userBidderId, name: 'You', currentBid: 0, isWinning: false });
    setBidders(newBidders);
  }, [config.numBidders, userBidderId]);

  const placeBid = useCallback((bidderId: string, amount: number) => {
    if (status !== 'running') return false;
    if (amount < highestBid + config.bidIncrement) {
      if (bidderId === userBidderId) {
        toast({
          variant: "destructive",
          title: "Invalid Bid",
          description: `Minimum next bid is ${formatCurrency(highestBid + config.bidIncrement, config.currency)}.`,
        });
      }
      return false;
    }

    const now = Date.now();
    setHighestBid(amount);
    setTimeLeft(config.duration); // Reset timer on new bid
    setBidHistory(prev => [...prev, { bidderId, amount, timestamp: now }]);
    
    const placingBidder = bidders.find(b => b.id === bidderId);
    if(placingBidder) {
        toast({
            title: "New Bid!",
            description: `${placingBidder.name} bid ${formatCurrency(convertCurrency(amount, config.currency, displayCurrency), displayCurrency)}.`,
        });
    }

    setBidders(prevBidders => prevBidders.map(b => ({
      ...b,
      currentBid: b.id === bidderId ? amount : b.currentBid,
      isWinning: b.id === bidderId,
    })));

    return true;
  }, [status, highestBid, config, bidders, userBidderId, toast, displayCurrency]);

  useEffect(() => {
    if (status !== 'running') return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setStatus('ended');
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);
  

  useEffect(() => {
    if (status === 'ended') {
      const winningBid = bidHistory[bidHistory.length - 1];
      if (winningBid) {
        const winnerInfo = bidders.find(b => b.id === winningBid.bidderId);
        setWinner(winnerInfo || null);
        toast({
            title: "Auction Ended!",
            description: `${winnerInfo?.name || 'Someone'} won with a bid of ${formatCurrency(convertCurrency(winningBid.amount, config.currency, displayCurrency), displayCurrency)}.`,
        });
      } else {
        toast({
            variant: "destructive",
            title: "Auction Ended",
            description: "No bids were placed.",
        });
      }
    }
  }, [status, bidders, bidHistory, toast, config.currency, displayCurrency]);

  return { bidders, bidHistory, timeLeft, highestBid, status, winner, placeBid, userBidderId, displayCurrency, setDisplayCurrency };
}
