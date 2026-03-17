import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { ActionCardComponent } from '../../components/molecules/action-card/action-card.component';
import { FundsState } from '../../../core/store/states/funds.state';
import { UserSubscription, Transaction } from '../../../domain/models';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterModule, ActionCardComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  balance$!: Observable<number>;
  subscriptions$!: Observable<UserSubscription[]>;
  transactions$!: Observable<Transaction[]>;

  private subscriptions: UserSubscription[] = [];
  private transactions: Transaction[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.balance$ = this.store.select(FundsState.balance);
    this.subscriptions$ = this.store.select(FundsState.subscriptions);
    this.transactions$ = this.store.select(FundsState.transactions);

    // Suscribirse para mantener los datos locales
    this.subscriptions$.subscribe(subs => this.subscriptions = subs);
    this.transactions$.subscribe(trans => this.transactions = trans);
  }

  getTotalInvested(): number {
    const total = this.subscriptions.reduce((sum, sub) => {
      return sum + Number(sub.amount);
    }, 0);
    return total;
  }

  getUniqueCategories(): number {
    const categories = new Set(this.subscriptions.map(sub => sub.fundCategory || 'N/A'));
    return categories.size;
  }

  getLastActivityDays(): string {
    if (this.transactions.length === 0) {
      return 'Sin actividad';
    }
    
    // Encontrar la transacción más reciente
    const sortedTransactions = [...this.transactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const lastTransaction = sortedTransactions[0];
    
    // Comparar solo las fechas sin considerar horas
    const lastDate = new Date(lastTransaction.date);
    lastDate.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    return `Hace ${diffDays} días`;
  }
}
