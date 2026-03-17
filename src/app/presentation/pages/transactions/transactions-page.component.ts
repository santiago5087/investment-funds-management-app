import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TransactionsTableComponent } from '../../components/organisms/transactions-table/transactions-table.component';
import { Transaction } from '../../../domain/models';
import { FundsState } from '../../../core/store/states/funds.state';

@Component({
  selector: 'app-transactions-page',
  imports: [CommonModule, TransactionsTableComponent],
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss'],
})
export class TransactionsPageComponent implements OnInit {
  transactions$!: Observable<Transaction[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.transactions$ = this.store.select(FundsState.transactions);
  }
}
