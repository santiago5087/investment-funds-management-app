export interface InvestmentFund {
  id: string;
  name: string;
  minimumAmount: number;
  category: FundCategory;
  description: string;
}

export type FundCategory = 'FPV' | 'FIC';
