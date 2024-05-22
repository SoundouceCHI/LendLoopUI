import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { first } from 'rxjs';
import { UserLogin } from '../models/userLogin.model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JwtModule, JWT_OPTIONS,JwtHelperService, } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
import { jwtConfig } from '../config/jwt.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [JwtHelperService, AuthService], 
  template: `
<div class="card">
  <h4 class="card-header">Login</h4>
  <div class="card-body">
    <form [formGroup]="loginForm" (ngSubmit)="submitLogin()">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="text" formControlName="email" class="form-control" />
        <div *ngIf="submitted && loginForm.get('email')?.errors">
          <div *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</div>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" formControlName="password" class="form-control" />
        <div *ngIf="submitted && loginForm.get('password')?.errors">
          <div *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</div>
        </div>
        <div *ngIf="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
      <button class="button">
                    <span *ngIf="loading" class="spinner-border spinner-border-sm me-1"></span>
                        Login
                        <div class="hoverEffect">
                        <div>
                        </div>
                        </div>
                    </button>
                    <a routerLink="../register" class="btn btn-link">Register</a>
                </div>
            </form>
        </div>
    </div>



  `,
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({ 
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
  }); 
  submitted = false; 
  loading = false;
  errorMessage: string =''; 
  sessionInfo: { name: string, id: string } = { name: '', id: '' };

  private authService = inject(AuthService);

  constructor(private userService: UserService, private router: Router){}
  submitLogin(){
    console.log("click"); 
    this.submitted = true; 
      this.loading = true;
      const userLogin = new UserLogin();
      userLogin.email = this.loginForm.value.email ?? ''; 
      userLogin.password = this.loginForm.value.password ?? ''; 
      this.userService.submitLogin(userLogin).pipe(first()).subscribe(success => {
        if (success) {
          const session = this.authService.getSessionInfo(); 
          console.log("LOGIN SESSION TOKEN "); 
          console.log(session); 
          if(session){
            this.sessionInfo = session; 
            this.router.navigate(['/']);
          }
          else {
            console.log("Session is null"); 
          }
        } else {
          this.loading = false;
          this.errorMessage = "Email or password incorrect"
        }
      });
  }
  
}
