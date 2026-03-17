import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FundsGridComponent } from '../../components/organisms/funds-grid/funds-grid.component';
import { SubscriptionFormComponent } from '../../components/molecules/subscription-form/subscription-form.component';
import { AlertComponent } from '../../components/atoms/alert/alert.component';
import { InvestmentFund, UserSubscription } from '../../../domain/models';
import { LoadFunds, SubscribeToFund } from '../../../core/store/actions/funds.actions';
import { FundsState } from '../../../core/store/states/funds.state';

@Component({
  selector: 'app-funds-page',
  imports: [
    CommonModule,
    FundsGridComponent,
    SubscriptionFormComponent,
    AlertComponent,
  ],
  templateUrl: './funds-page.component.html',
  styleUrls: ['./funds-page.component.scss'],
})
export class FundsPageComponent implements OnInit {
  availableFunds$!: Observable<InvestmentFund[]>;
  balance$!: Observable<number>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  subscriptions$!: Observable<UserSubscription[]>;

  selectedFund = signal<InvestmentFund | null>(null);
  subscribedIds = signal<string[]>([]);

  constructor(private store: Store) {}

  ngOnInit() {
    this.availableFunds$ = this.store.select(FundsState.availableFunds);
    this.balance$ = this.store.select(FundsState.balance);
    this.loading$ = this.store.select(FundsState.loading);
    this.error$ = this.store.select(FundsState.error);
    this.subscriptions$ = this.store.select(FundsState.subscriptions);

    this.store.dispatch(new LoadFunds());

    this.subscriptions$.subscribe((subs) => {
      this.subscribedIds.set(subs.map((s) => s.fundId));
    });
  }

  openSubscriptionModal(fund: InvestmentFund) {
    this.selectedFund.set(fund);
  }

  closeModal() {
    this.selectedFund.set(null);
  }

  handleSubscribe(data: { amount: number; notificationMethod: any; email?: string; phone?: string }) {
    if (this.selectedFund()) {
      this.store.dispatch(
        new SubscribeToFund(
          this.selectedFund()!.id,
          data.amount,
          data.notificationMethod,
          data.email,
          data.phone
        )
      );
      this.closeModal();
    }
  }

  handleCancel(fund: InvestmentFund) {
    // Esto se manejará desde la página de suscripciones
    console.log('Cancel', fund);
  }

  clearError() {
    // Implementar si se necesita
  }
}
