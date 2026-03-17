import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundCardComponent } from '../../molecules/fund-card/fund-card.component';
import { SpinnerComponent } from '../../atoms/spinner/spinner.component';
import { InvestmentFund } from '../../../../domain/models';

@Component({
  selector: 'app-funds-grid',
  imports: [CommonModule, FundCardComponent, SpinnerComponent],
  templateUrl: './funds-grid.component.html',
  styleUrls: ['./funds-grid.component.scss'],
})
export class FundsGridComponent {
  funds = input.required<InvestmentFund[]>();
  loading = input<boolean>(false);
  subscribedFundIds = input<string[]>([]);
  
  onSubscribe = output<InvestmentFund>();
  onCancel = output<InvestmentFund>();

  isSubscribed(fundId: string): boolean {
    return this.subscribedFundIds().includes(fundId);
  }
}
