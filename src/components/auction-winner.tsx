"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { PartyPopper, RefreshCcw } from 'lucide-react';
import { formatCurrency, convertCurrency } from '@/lib/currency';
import type { Bidder, Currency, AuctionConfig } from '@/lib/types';
import Confetti from 'react-dom-confetti';
import { useEffect, useState } from 'react';

interface AuctionWinnerProps {
    winner: Bidder | null;
    winningBid: number;
    currency: Currency;
    onRestart: () => void;
    config: AuctionConfig;
}

export default function AuctionWinner({ winner, winningBid, currency, onRestart, config }: AuctionWinnerProps) {
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
      // Use a timeout to ensure the component has mounted and is visible
      const timer = setTimeout(() => {
        if (winner) {
          setIsExploding(true);
        }
      }, 100);
      return () => clearTimeout(timer);
    }, [winner]);
    
    const confettiConfig = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 200,
        dragFriction: 0.12,
        duration: 5000,
        stagger: 3,
        width: "10px",
        height: "10px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
      };

    return (
        <div className="flex items-center justify-center min-h-[70vh] relative">
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Confetti active={isExploding} config={confettiConfig} />
            </div>
            <Card className="w-full max-w-md text-center animate-in zoom-in-95 duration-500 bg-card/80 backdrop-blur-sm border-0">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                        <PartyPopper className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-3xl pt-4 font-headline">Auction Ended!</CardTitle>
                    <CardDescription>
                        {winner ? `Congratulations to the winner!` : 'This auction ended without a winner.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {winner ? (
                        <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                            <p className="text-lg font-semibold">{winner.name}</p>
                            <p className="text-sm text-muted-foreground">Won with a final bid of</p>
                            <p className="text-4xl font-bold text-primary">
                                {formatCurrency(convertCurrency(winningBid, config.currency, currency), currency)}
                            </p>
                        </div>
                    ) : (
                        <p className="text-muted-foreground py-8">Better luck next time!</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={onRestart} className="w-full" variant="secondary">
                        <RefreshCcw />
                        Start New Auction
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
