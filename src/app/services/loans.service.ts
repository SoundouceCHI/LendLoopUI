import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanPeriod } from '../models/loanPeriod.model';



@Injectable({
  providedIn: 'root'
})
export class LoansService {
  private apiUrl = "https://localhost:7041/api/Loans/ItemPeriods";

  constructor(private http: HttpClient) { } 

  getUnavailableDatesByItem(itemId: number) : Observable<LoanPeriod[]> {
    return this.http.get<LoanPeriod[]>(`${this.apiUrl}/${itemId}`); 
  }
}
