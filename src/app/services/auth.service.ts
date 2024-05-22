import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  getToken(): string | null {
    return localStorage.getItem('userToken');  
  }
  
  decodeToken(): any {
    const token = this.getToken(); 
    const decode = token ? this.jwtHelper.decodeToken(token) : null;
    console.log("TOKEN : "); 
    console.log(token); 
    console.log("DECODE : "); 
    console.log(decode); 
    return token ? this.jwtHelper.decodeToken(token) : null;
  }
  
  isLoggedIn(): boolean {
    const token = this.getToken(); 
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }
  
  logout(): void {
    localStorage.removeItem('userToken');
  }

  getSessionInfo(): { name: string, id: string } | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.name && decodedToken.id) {
      return {
        name: decodedToken.name,
        id: decodedToken.id
      };
    }
    return null;
  }
  
}
  