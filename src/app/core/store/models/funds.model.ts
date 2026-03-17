import { InvestmentFund, Transaction, UserSubscription } from "@domain/models";

export interface FundsStateModel {
  funds: InvestmentFund[];
  subscriptions: UserSubscription[];
  transactions: Transaction[];
  balance: number;
  loading: boolean;
  error: string | null;
}
