import { Routes } from '@angular/router';
import { HomePageComponent } from './presentation/pages/home/home-page.component';
import { FundsPageComponent } from './presentation/pages/funds/funds-page.component';
import { SubscriptionsPageComponent } from './presentation/pages/subscriptions/subscriptions-page.component';
import { TransactionsPageComponent } from './presentation/pages/transactions/transactions-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'funds',
    component: FundsPageComponent,
  },
  {
    path: 'subscriptions',
    component: SubscriptionsPageComponent,
  },
  {
    path: 'transactions',
    component: TransactionsPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
