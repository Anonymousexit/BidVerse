"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Gavel } from 'lucide-react';
import type { Currency } from '@/lib/types';
import { useEffect } from 'react';
import { formatCurrency } from '@/lib/currency';

interface PlaceBidFormProps {
  highestBid: number;
  minIncrement: number;
  onPlaceBid: (amount: number) => void;
  currency: Currency;
}

export default function PlaceBidForm({ highestBid, minIncrement, onPlaceBid, currency }: PlaceBidFormProps) {
  const minNextBid = highestBid + minIncrement;
  
  const formSchema = z.object({
    bidAmount: z.coerce.number().min(minNextBid, `Bid must be at least ${formatCurrency(minNextBid, currency)}`),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  
  useEffect(() => {
    if (form.getValues('bidAmount') < minNextBid) {
        form.setValue('bidAmount', minNextBid);
    }
  }, [minNextBid, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onPlaceBid(values.bidAmount);
  };
  
  const quickBidAmount = minNextBid;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-2">
            <FormField
            control={form.control}
            name="bidAmount"
            render={({ field }) => (
                <FormItem className="flex-grow">
                <FormControl>
                    <div className="relative">
                        <Input type="number" placeholder={`e.g., ${minNextBid}`} {...field} />
                    </div>
                </FormControl>
                </FormItem>
            )}
            />
            <Button type="submit" className="flex-shrink-0">
                <Gavel /> Place Bid
            </Button>
        </div>
        <FormMessage>{form.formState.errors.bidAmount?.message}</FormMessage>
        <Button 
            type="button" 
            onClick={() => onPlaceBid(quickBidAmount)} 
            variant="accent" 
            className="w-full"
        >
            Quick Bid {formatCurrency(quickBidAmount, currency)}
        </Button>
      </form>
    </Form>
  );
}
