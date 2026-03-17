import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { FundCardComponent } from '../../components/molecules/fund-card/fund-card.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../components/molecules/confirm-dialog/confirm-dialog.component';
import { InvestmentFund } from '../../../domain/models';
import { CancelSubscription } from '../../../core/store/actions/funds.actions';
import { FundsState } from '../../../core/store/states/funds.state';

@Component({
  selector: 'app-subscriptions-page',
  imports: [CommonModule, RouterModule, MatDialogModule, ButtonComponent, FundCardComponent],
  templateUrl: './subscriptions-page.component.html',
  styleUrls: ['./subscriptions-page.component.scss'],
})
export class SubscriptionsPageComponent implements OnInit {
  subscribedFunds$!: Observable<InvestmentFund[]>;

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Obtener los fondos completos que están suscritos
    this.subscribedFunds$ = this.store.select(FundsState.subscriptions).pipe(
      map(subscriptions => {
        const funds = this.store.selectSnapshot(FundsState.funds);
        return subscriptions
          .map(sub => funds.find(fund => fund.id === sub.fundId))
          .filter(fund => fund !== undefined) as InvestmentFund[];
      })
    );
  }

  handleCancel(fund: InvestmentFund) {
    this.confirmCancel(fund.id, fund.name);
  }

  private confirmCancel(fundId: string, fundName: string) {
    const dialogData: ConfirmDialogData = {
      title: '¿Cancelar suscripción?',
      message: `¿Estás seguro de que deseas cancelar tu suscripción al fondo "${fundName}"? Esta acción no se puede deshacer.`,
      confirmText: 'Sí, cancelar',
      cancelText: 'No, mantener',
      type: 'danger'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: dialogData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CancelSubscription(fundId));
      }
    });
  }
}
