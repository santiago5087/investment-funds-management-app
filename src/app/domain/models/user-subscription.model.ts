export interface UserSubscription {
  fundId: string;
  fundName: string;
  fundCategory?: string;
  amount: number;
  subscriptionDate: Date;
}
