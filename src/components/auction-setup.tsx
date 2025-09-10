"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { AuctionConfig } from "@/lib/types";
import { currencies } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { placeholderImages } from '@/lib/placeholder-images.json'

const setupSchema = z.object({
  numBidders: z.coerce.number().int().min(2, "Must have at least 2 bidders.").max(50, "Maximum 50 bidders."),
  currency: z.enum(currencies),
  minBid: z.coerce.number().positive("Minimum bid must be positive."),
  bidIncrement: z.coerce.number().positive("Bid increment must be positive."),
  duration: z.coerce.number().int().min(60, "Duration must be at least 60 seconds.").max(3600, "Max 1 hour."),
});

interface AuctionSetupProps {
  initialConfig: AuctionConfig;
  onStartAuction: (config: AuctionConfig) => void;
}

export default function AuctionSetup({ initialConfig, onStartAuction }: AuctionSetupProps) {
  const [numBiddersOption, setNumBiddersOption] = useState<string>(initialConfig.numBidders.toString());
  
  const form = useForm<z.infer<typeof setupSchema>>({
    resolver: zodResolver(setupSchema),
    defaultValues: initialConfig,
  });

  const onSubmit = (values: z.infer<typeof setupSchema>) => {
    onStartAuction(values);
  };
  
  const selectedNumBidders = form.watch("numBidders");

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-4">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Vintage Sports Car</CardTitle>
                    <CardDescription>A beautifully restored 1965 classic sports car. A true collector's item.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video overflow-hidden rounded-lg border">
                        <Image
                            src={placeholderImages[0].imageUrl}
                            alt={placeholderImages[0].description}
                            data-ai-hint={placeholderImages[0].imageHint}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
        <Card className="w-full">
        <CardHeader>
            <CardTitle>Configure Your Auction</CardTitle>
            <CardDescription>Set the parameters for the live auction simulation.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="numBidders"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Number of Bidders</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={(value) => {
                                setNumBiddersOption(value);
                                if (value !== 'custom') {
                                    field.onChange(parseInt(value));
                                }
                            }}
                            value={['5', '10', '20'].includes(selectedNumBidders.toString()) && numBiddersOption !== 'custom' ? selectedNumBidders.toString() : 'custom'}
                            className="flex items-center gap-4 flex-wrap"
                            >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="5" /></FormControl>
                                <FormLabel className="font-normal">5</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="10" /></FormControl>
                                <FormLabel className="font-normal">10</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="20" /></FormControl>
                                <FormLabel className="font-normal">20</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="custom"/></FormControl>
                                <FormLabel className="font-normal">Custom</FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                         {numBiddersOption === 'custom' && (
                             <Input
                                type="number"
                                {...field}
                                placeholder="e.g., 15"
                                className="w-40"
                                onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                              />
                         )}
                        <FormMessage />
                        </FormItem>
                    )}
                />
                
                <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="currency" render={({ field }) => (
                        <FormItem><FormLabel>Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select currency" /></SelectTrigger></FormControl>
                            <SelectContent>{currencies.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent>
                        </Select><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="minBid" render={({ field }) => (
                        <FormItem><FormLabel>Starting Bid</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>
                 <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="bidIncrement" render={({ field }) => (
                        <FormItem><FormLabel>Bid Increment</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="duration" render={({ field }) => (
                        <FormItem><FormLabel>Duration (seconds)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                 </div>
                
                <Button type="submit" variant="accent" className="w-full" size="lg">
                    <PlayCircle />
                    Start Auction
                </Button>
            </form>
            </Form>
        </CardContent>
        </Card>
    </div>
  );
}
