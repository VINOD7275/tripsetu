import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig } from '../types';
import { CURRENCIES } from '../data/mockData';

interface CurrencyContextType {
  currentCurrency: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
  formatAmount: (amountInInr: number) => string;
  convertFromInr: (amountInInr: number) => number;
  convertToInr: (foreignAmount: number) => number;
  availableCurrencies: CurrencyConfig[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('INR');

  useEffect(() => {
    const saved = localStorage.getItem('triptrail_currency') as CurrencyCode;
    if (saved && CURRENCIES[saved]) {
      setCurrencyCode(saved);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyCode(code);
    localStorage.setItem('triptrail_currency', code);
  };

  const currentCurrency = CURRENCIES[currencyCode] || CURRENCIES.INR;

  const convertFromInr = (amountInInr: number): number => {
    return Math.round(amountInInr / currentCurrency.rateToInr);
  };

  const convertToInr = (foreignAmount: number): number => {
    return Math.round(foreignAmount * currentCurrency.rateToInr);
  };

  const formatAmount = (amountInInr: number): string => {
    const converted = convertFromInr(amountInInr);
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        setCurrency,
        formatAmount,
        convertFromInr,
        convertToInr,
        availableCurrencies: Object.values(CURRENCIES),
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
