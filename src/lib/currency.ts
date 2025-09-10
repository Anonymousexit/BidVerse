import type { Currency } from './types';

export const currencies = ['USD', 'EUR', 'NGN'] as const;

export const conversionRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.93,
  NGN: 1500,
};

export function formatCurrency(amount: number, currency: Currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function convertCurrency(amount: number, from: Currency, to: Currency) {
  const amountInUSD = amount / conversionRates[from];
  return amountInUSD * conversionRates[to];
}
