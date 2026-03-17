import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvestmentFund } from '../../domain/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FundsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/funds`;

  getFunds(): Observable<InvestmentFund[]> {
    return this.http.get<InvestmentFund[]>(this.apiUrl);
  }

  getFundById(id: string): Observable<InvestmentFund> {
    return this.http.get<InvestmentFund>(`${this.apiUrl}/${id}`);
  }
}
