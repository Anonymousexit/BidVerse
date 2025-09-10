"use client";

import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, currencies, convertCurrency } from '@/lib/currency';
import type { useAuctionSimulation } from '@/hooks/use-auction-simulation';
import type { AuctionConfig } from '@/lib/types';
import PlaceBidForm from './place-bid-form';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Timer, Landmark, Users, Droplets, MonitorPlay, Lightbulb, ShieldCheck, EarOff } from 'lucide-react';

type AuctionDetailsProps = {
  auction: ReturnType<typeof useAuctionSimulation>;
  config: AuctionConfig;
};

const qualities = [
    { name: "Nearness to the Water dispenser", icon: Droplets, rating: "10/10" },
    { name: "Ambience", icon: Lightbulb, rating: "10/10" },
    { name: "Perfect lighting", icon: Lightbulb, rating: "10/10" },
    { name: "Ease of access to the television", icon: MonitorPlay, rating: "10/10" },
    { name: "Privacy", icon: ShieldCheck, rating: "10/10" },
    { name: "No disturbances", icon: EarOff, rating: "10/10" },
]

export default function AuctionDetails({ auction, config }: AuctionDetailsProps) {
  const { timeLeft, highestBid, placeBid, userBidderId, displayCurrency, setDisplayCurrency, bidders } = auction;
  const progress = (timeLeft / config.duration) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-0">
      <div className="grid md:grid-cols-2">
        <div className="p-2">
          <Image
            src={placeholderImages[0].imageUrl}
            alt={placeholderImages[0].description}
            data-ai-hint={placeholderImages[0].imageHint}
            width={800}
            height={600}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-headline text-3xl font-bold">The Chairman's Seat</h2>
              <Select onValueChange={(value) => setDisplayCurrency(value as any)} defaultValue={displayCurrency}>
                <SelectTrigger className="w-[100px]"><SelectValue placeholder="Currency" /></SelectTrigger>
                <SelectContent>{currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <p className="text-muted-foreground mb-6">The ultimate ergonomic office chair, positioned for maximum comfort and productivity.</p>

            <div className="space-y-4">
              <div className="flex justify-between items-baseline bg-primary/10 p-4 rounded-lg">
                <span className="text-muted-foreground font-medium">Current Bid</span>
                <span className="text-3xl font-bold text-primary">
                  {formatCurrency(convertCurrency(highestBid, config.currency, displayCurrency), displayCurrency)}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className='flex items-center gap-2'><Timer className="h-4 w-4" /><span>Time Left</span></div>
                  <span className="font-mono font-semibold text-foreground">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <div className="grid grid-cols-2 text-sm text-muted-foreground">
                <div className='flex items-center gap-2'><Landmark className="h-4 w-4" /><span>Min. Increment</span></div>
                <span className="text-right font-semibold text-foreground">{formatCurrency(convertCurrency(config.bidIncrement, config.currency, displayCurrency), displayCurrency)}</span>
              </div>
              <div className="grid grid-cols-2 text-sm text-muted-foreground">
                <div className='flex items-center gap-2'><Users className="h-4 w-4" /><span>Bidders</span></div>
                <span className="text-right font-semibold text-foreground">{bidders.length}</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <PlaceBidForm
              highestBid={highestBid}
              minIncrement={config.bidIncrement}
              onPlaceBid={(amount) => placeBid(userBidderId, amount)}
              currency={config.currency}
            />
          </div>
        </div>
      </div>
       <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Key Qualities</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {qualities.map(quality => (
                <div key={quality.name} className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
                    <quality.icon className="h-5 w-5 text-primary"/>
                    <div>
                        <p className="font-semibold text-foreground">{quality.name}</p>
                        <p className="text-primary font-bold">{quality.rating}</p>
                    </div>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
