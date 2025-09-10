"use client";

import type { Bidder, Currency, AuctionConfig } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatCurrency, convertCurrency } from '@/lib/currency';
import { Badge } from './ui/badge';
import { BrainCircuit, TrendingUp, User, Trophy } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface BidderListProps {
  bidders: Bidder[];
  currency: Currency;
  config: AuctionConfig;
}

export default function BidderList({ bidders, currency, config }: BidderListProps) {
  const sortedBidders = [...bidders].sort((a, b) => b.currentBid - a.currentBid);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bidders Panel</CardTitle>
        <CardDescription>Real-time actions and AI predictions for each bidder.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedBidders.map((bidder) => (
            <Card key={bidder.id} className={`p-4 flex flex-col justify-between transition-all ${bidder.isWinning ? 'border-primary ring-2 ring-primary shadow-lg' : 'border-border'}`}>
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={`${bidder.isWinning ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        {bidder.name === 'You' ? <User className="h-4 w-4"/> : bidder.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm">{bidder.name}</span>
                  </div>
                  {bidder.isWinning && <Badge variant="default" className="flex items-center gap-1"><Trophy className="h-3 w-3" /> Winning</Badge>}
                </div>
                <p className="text-2xl font-bold text-center my-2 text-foreground">
                  {bidder.currentBid > 0 ? formatCurrency(convertCurrency(bidder.currentBid, config.currency, currency), currency) : <span className="text-muted-foreground">-</span>}
                </p>
              </div>
              {bidder.name !== 'You' && (
                <div className="text-xs text-muted-foreground mt-2 border-t pt-2 space-y-1">
                  <div className="flex items-center gap-1 font-medium">
                     <BrainCircuit className="h-4 w-4" />
                     <span>AI Prediction:</span>
                  </div>
                   {bidder.predictedAction ? (
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{bidder.predictedAction}</span>
                        <Badge variant="secondary" className="text-primary">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {((bidder.confidence || 0) * 100).toFixed(0)}%
                        </Badge>
                      </div>
                    ) : (
                      <Skeleton className="h-4 w-3/4" />
                    )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
