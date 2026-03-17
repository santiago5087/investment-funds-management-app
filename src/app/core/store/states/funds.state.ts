import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  LoadFunds,
  LoadFundsSuccess,
  LoadFundsFailure,
  SubscribeToFund,
  CancelSubscription,
  ResetState,
} from '../actions/funds.actions';
import { FundsService } from '../../../data/services/funds.service';
import { NotificationService } from '../../services/notification.service';
import {
  InvestmentFund,
  Transaction,
  UserSubscription,
} from '../../../domain/models';
import { FundsStateModel } from '../models/funds.model';


const INITIAL_BALANCE = 500000;

@State<FundsStateModel>({
  name: 'funds',
  defaults: {
    funds: [],
    subscriptions: [],
    transactions: [],
    balance: INITIAL_BALANCE,
    loading: false,
    error: null,
  },
})
@Injectable()
export class FundsState {
  private fundsService = inject(FundsService);
  private notificationService = inject(NotificationService);

  @Selector()
  static funds(state: FundsStateModel): InvestmentFund[] {
    return state.funds;
  }

  @Selector()
  static subscriptions(state: FundsStateModel): UserSubscription[] {
    return state.subscriptions;
  }

  @Selector()
  static transactions(state: FundsStateModel): Transaction[] {
    return state.transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  @Selector()
  static balance(state: FundsStateModel): number {
    return state.balance;
  }

  @Selector()
  static loading(state: FundsStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static error(state: FundsStateModel): string | null {
    return state.error;
  }

  @Selector()
  static availableFunds(state: FundsStateModel): InvestmentFund[] {
    const subscribedIds = state.subscriptions.map((s) => s.fundId);
    return state.funds.filter((fund) => !subscribedIds.includes(fund.id));
  }

  @Action(LoadFunds)
  loadFunds(ctx: StateContext<FundsStateModel>) {
    ctx.patchState({ loading: true, error: null });
    return this.fundsService.getFunds().pipe(
      tap((funds) => {
        ctx.dispatch(new LoadFundsSuccess(funds));
      }),
      catchError((error) => {
        ctx.dispatch(new LoadFundsFailure(error.message || 'Error loading funds'));
        return of(null);
      })
    );
  }

  @Action(LoadFundsSuccess)
  loadFundsSuccess(
    ctx: StateContext<FundsStateModel>,
    action: LoadFundsSuccess
  ) {
    ctx.patchState({
      funds: action.funds,
      loading: false,
      error: null,
    });
  }

  @Action(LoadFundsFailure)
  loadFundsFailure(
    ctx: StateContext<FundsStateModel>,
    action: LoadFundsFailure
  ) {
    ctx.patchState({
      loading: false,
      error: action.error,
    });
  }

  @Action(SubscribeToFund)
  subscribeToFund(
    ctx: StateContext<FundsStateModel>,
    action: SubscribeToFund
  ) {
    const state = ctx.getState();
    const fund = state.funds.find((f) => f.id === action.fundId);

    if (!fund) {
      const errorMsg = 'Fondo no encontrado';
      ctx.patchState({ error: errorMsg });
      this.notificationService.error('Error', 'El fondo seleccionado no existe en el sistema');
      return;
    }

    if (action.amount < fund.minimumAmount) {
      const errorMsg = `Monto mínimo: $${fund.minimumAmount.toLocaleString('es-CO')}`;
      ctx.patchState({ error: errorMsg });
      this.notificationService.error(
        'Monto insuficiente',
        `El monto mínimo de inversión es $${fund.minimumAmount.toLocaleString('es-CO')}`
      );
      return;
    }

    if (state.balance < action.amount) {
      const errorMsg = 'Saldo insuficiente';
      ctx.patchState({ error: errorMsg });
      this.notificationService.error(
        'Saldo insuficiente',
        `Tu saldo actual es $${state.balance.toLocaleString('es-CO')}. Necesitas $${action.amount.toLocaleString('es-CO')}`
      );
      return;
    }

    const subscription: UserSubscription = {
      fundId: fund.id,
      fundName: fund.name,
      fundCategory: fund.category,
      amount: action.amount,
      subscriptionDate: new Date(),
    };

    const transaction: Transaction = {
      id: `txn-${Date.now()}`,
      fundId: fund.id,
      fundName: fund.name,
      type: 'subscription',
      amount: action.amount,
      date: new Date(),
      notificationMethod: action.notificationMethod,
      email: action.email,
      phone: action.phone,
    };

    ctx.patchState({
      subscriptions: [...state.subscriptions, subscription],
      transactions: [...state.transactions, transaction],
      balance: Number(state.balance) - Number(action.amount),
      error: null,
    });

    // Mostrar notificación de éxito
    this.notificationService.success(
      'Suscripción exitosa',
      `Te has suscrito a ${fund.name} por $${action.amount.toLocaleString('es-CO')}`
    );
  }

  @Action(CancelSubscription)
  cancelSubscription(
    ctx: StateContext<FundsStateModel>,
    action: CancelSubscription
  ) {
    const state = ctx.getState();
    const subscription = state.subscriptions.find(
      (s) => s.fundId === action.fundId
    );

    if (!subscription) {
      const errorMsg = 'Suscripción no encontrada';
      ctx.patchState({ error: errorMsg });
      this.notificationService.error('Error', 'No se encontró la suscripción que intentas cancelar');
      return;
    }

    const transaction: Transaction = {
      id: `txn-${Date.now()}`,
      fundId: subscription.fundId,
      fundName: subscription.fundName,
      type: 'cancellation',
      amount: subscription.amount,
      date: new Date(),
    };

    ctx.patchState({
      subscriptions: state.subscriptions.filter(
        (s) => s.fundId !== action.fundId
      ),
      transactions: [...state.transactions, transaction],
      balance: Number(state.balance) + Number(subscription.amount),
      error: null,
    });

    // Mostrar notificación de éxito
    this.notificationService.success(
      'Cancelación exitosa',
      `Tu suscripción ha sido cancelada. Reembolso: $${subscription.amount.toLocaleString('es-CO')}`
    );
  }

  @Action(ResetState)
  resetState(ctx: StateContext<FundsStateModel>) {
    ctx.setState({
      funds: ctx.getState().funds,
      subscriptions: [],
      transactions: [],
      balance: INITIAL_BALANCE,
      loading: false,
      error: null,
    });
  }
}
