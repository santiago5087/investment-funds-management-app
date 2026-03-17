import { Observable } from 'rxjs';
import { InvestmentFund } from '../models';

export abstract class FundsRepository {
  public abstract getFunds(): Observable<InvestmentFund[]>;
  public abstract getFundById(id: string): Observable<InvestmentFund>;
}
