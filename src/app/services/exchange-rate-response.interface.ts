export interface ExchangeRateResponse {
  [key: string]: {
    USD: number;
    // other currencies if available
  };
}
