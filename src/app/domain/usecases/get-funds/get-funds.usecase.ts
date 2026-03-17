import { UseCase } from '@base/use-case';
import { Observable } from 'rxjs';
import { InvestmentFund } from '../../models';
import { FundsRepository } from '../../repositories/funds.repository';

export class GetFundsUseCase implements UseCase<void, InvestmentFund[]> {
  constructor(private readonly fundsRepository: FundsRepository) {}

  public execute(): Observable<InvestmentFund[]> {
    return this.fundsRepository.getFunds();
  }
}
