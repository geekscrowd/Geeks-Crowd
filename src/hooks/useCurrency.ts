import { useState, useEffect } from 'react';

export type Currency = {
  code: 'USD' | 'INR';
  symbol: string;
  rate: number; // 1 USD to this currency
  minBudget: number; // Minimum budget in local currency
};

const USD: Currency = { code: 'USD', symbol: '$', rate: 1, minBudget: 499 };
const INR: Currency = { code: 'INR', symbol: '₹', rate: 83, minBudget: 25000 };

export const useCurrency = () => {
  const [currency, setCurrency] = useState<Currency>(USD);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // 1. Primary check: Timezone & Offset (Most reliable local check)
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const offset = new Date().getTimezoneOffset();
        
        // India is UTC+5:30, which is -330 minutes in getTimezoneOffset()
        if (timeZone === 'Asia/Kolkata' || timeZone === 'Asia/Calcutta' || offset === -330) {
          setCurrency(INR);
          setIsLoading(false);
          return;
        }

        // 2. Secondary check: Browser languages (Check for any Indian language/locale)
        const indianLocales = ['en-IN', 'hi-IN', 'bn-IN', 'gu-IN', 'kn-IN', 'mr-IN', 'pa-IN', 'ta-IN', 'te-IN'];
        if (navigator.languages.some(lang => indianLocales.includes(lang) || lang.endsWith('-IN'))) {
          setCurrency(INR);
          setIsLoading(false);
          return;
        }

        // 3. Tertiary check: Multiple IP Geolocation APIs
        const providers = [
          'https://ipapi.co/json/',
          'https://ip-api.com/json/',
          'https://api.iplocation.net/?cmd=get-country',
          'https://extreme-ip-lookup.com/json/'
        ];

        for (const url of providers) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            
            const response = await fetch(url, { signal: controller.signal });
            const data = await response.json();
            clearTimeout(timeoutId);
            
            const country = (data.country_code || data.countryCode || data.country_code2 || data.country_name || data.country || '').toUpperCase();
            
            if (country === 'IN' || country === 'INDIA') {
              setCurrency(INR);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            continue; 
          }
        }
        
        setCurrency(USD);
      } catch (error) {
        setCurrency(USD);
      } finally {
        setIsLoading(false);
      }
    };

    detectLocation();
  }, []);

  const formatPrice = (usdAmount: number) => {
    const converted = Math.round(usdAmount * currency.rate);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  return { currency, formatPrice, isLoading };
};
