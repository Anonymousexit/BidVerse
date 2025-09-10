"use client";

import type { Bid, Bidder, Currency, AuctionConfig } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency, convertCurrency } from '@/lib/currency';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from './ui/badge';

interface BidHistoryProps {
  bidHistory: Bid[];
  bidders: Bidder[];
  currency: Currency;
  config: AuctionConfig;
}

export default function BidHistory({ bidHistory, bidders, currency, config }: BidHistoryProps) {
  const getBidderName = (bidderId: string) => {
    return bidders.find((b) => b.id === bidderId)?.name || 'Unknown';
  };
  
  const reversedHistory = [...bidHistory].reverse();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bid History</CardTitle>
        <CardDescription>A log of all bids placed in the auction.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[28rem]">
          <div className="space-y-4 pr-4">
            {reversedHistory.length === 0 && (
                <div className='flex flex-col items-center justify-center h-full text-center text-muted-foreground pt-24'>
                    <p className='font-semibold'>No bids yet.</p>
                    <p className='text-sm'>Be the first to start the action!</p>
                </div>
            )}
            {reversedHistory.map((bid, index) => (
              <div key={bid.timestamp} className="flex justify-between items-center animate-in fade-in duration-500">
                <div>
                  <p className="font-semibold">{getBidderName(bid.bidderId)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(bid.timestamp), { addSuffix: true })}
                  </p>
                </div>
                <div className="text-right">
                    <Badge variant={index === 0 ? "default" : "secondary"} className="text-sm">
                        {formatCurrency(convertCurrency(bid.amount, config.currency, currency), currency)}
                    </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
