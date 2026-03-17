import { NotificationMethod } from '@domain/models';

// Actions for fetching funds
export class LoadFunds {
  static readonly type = '[Funds] Load Funds';
}

export class LoadFundsSuccess {
  static readonly type = '[Funds] Load Funds Success';
  constructor(public funds: any[]) {}
}

export class LoadFundsFailure {
  static readonly type = '[Funds] Load Funds Failure';
  constructor(public error: string) {}
}

// Actions for subscriptions
export class SubscribeToFund {
  static readonly type = '[Funds] Subscribe To Fund';
  constructor(
    public fundId: string,
    public amount: number,
    public notificationMethod: NotificationMethod,
    public email?: string,
    public phone?: string
  ) {}
}

export class CancelSubscription {
  static readonly type = '[Funds] Cancel Subscription';
  constructor(public fundId: string) {}
}

//Reset state
export class ResetState {
  static readonly type = '[Funds] Reset State';
}
