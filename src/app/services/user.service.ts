import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/userLogin.model';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://localhost:7041/api/UserApps"; 
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  getUserIdByUserName(userName: string): Observable<number> {
    const url = `${this.apiUrl}/getUserByUserName?userName=${userName}`;
    return this.http.get<number>(url);
  }

  submitLogin(userLogin: UserLogin): Observable<boolean> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<{ token: string }>(url, userLogin).pipe(
      tap(res => {
        this.setSession(res.token);
      }),
      mapTo(true),
      catchError(error => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }

  private setSession(Token: string) {
    console.log('Token:', Token);
    localStorage.setItem('userToken', Token);
    const decodedToken = this.jwtHelper.decodeToken(Token);
    console.log('Decoded Token:', decodedToken);
  }

  logout() {
    localStorage.removeItem('userToken');
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }
}