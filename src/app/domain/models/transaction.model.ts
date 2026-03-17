export interface Transaction {
  id: string;
  fundId: string;
  fundName: string;
  type: TransactionType;
  amount: number;
  date: Date;
  notificationMethod?: NotificationMethod;
}

export type TransactionType = 'subscription' | 'cancellation';

export type NotificationMethod = 'email' | 'sms';
