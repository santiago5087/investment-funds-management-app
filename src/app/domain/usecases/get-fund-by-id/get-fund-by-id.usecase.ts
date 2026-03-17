import { UseCase } from '@base/use-case';
import { Observable } from 'rxjs';
import { InvestmentFund } from '../../models';
import { FundsRepository } from '../../repositories/funds.repository';

export class GetFundByIdUseCase implements UseCase<string, InvestmentFund> {
  constructor(private readonly fundsRepository: FundsRepository) {}

  public execute(id: string): Observable<InvestmentFund> {
    return this.fundsRepository.getFundById(id);
  }
}
