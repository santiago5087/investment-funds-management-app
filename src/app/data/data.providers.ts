import { FundsRepository } from '@domain/repositories';
import { GetFundsUseCase, GetFundByIdUseCase } from '@domain/usecases';

import { FundsImplementationRepository } from './repositories/funds/funds-implementation.repository';

export const DATA_PROVIDERS = [
  { provide: FundsRepository, useClass: FundsImplementationRepository },
  {
    provide: GetFundsUseCase,
    useFactory: (fundsRepo: FundsRepository) => new GetFundsUseCase(fundsRepo),
    deps: [FundsRepository],
  },
  {
    provide: GetFundByIdUseCase,
    useFactory: (fundsRepo: FundsRepository) => new GetFundByIdUseCase(fundsRepo),
    deps: [FundsRepository],
  },
];
