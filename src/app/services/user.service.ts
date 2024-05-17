import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/userLogin.model';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://localhost:7041/api/UserApps"; 
  constructor(private http: HttpClient) { }

  submitLogin(userLogin: UserLogin): Observable<boolean> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<{ token: string }>(url, userLogin).pipe(
      tap(res => this.setSession(res.token)),
      mapTo(true),
      catchError(error => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }

  private setSession(token: string) {
    localStorage.setItem('userToken', token);
  }

  logout() {
    localStorage.removeItem('userToken');
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
