import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InvestmentFund } from '@domain/models';
import { FundsRepository } from '@domain/repositories/funds.repository';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FundsImplementationRepository extends FundsRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/funds`;

  public override getFunds(): Observable<InvestmentFund[]> {
    return this.http.get<InvestmentFund[]>(this.apiUrl).pipe(
      delay(1000) // Delay de 1 segundo para apreciar el spinner
    );
  }

  public override getFundById(id: string): Observable<InvestmentFund> {
    return this.http.get<InvestmentFund>(`${this.apiUrl}/${id}`).pipe(
      delay(1000) // Delay de 1 segundo para apreciar el spinner
    );
  }
}
