import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="card">
    <h4 class="card-header">Login</h4>
    <div class="card-body">
            <form [formGroup]="loginForm">
                <div class="mb-3">
                    <label class="form-label">Username</label>
                    <input type="text" formControlName="userName" class="form-control" />
                    <div *If="submitted && f.userName.errors" class="invalid-feedback">
                        <div *If="f.userName.errors.required">Username is required</div>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" formControlName="password" class="form-control" />
                    <div *If="submitted && f.password.errors" class="invalid-feedback">
                        <div *If="f.password.errors.required">Password is required</div>
                    </div>
                </div>
                <div>
                    <button class="button">
                    <span *If="loading" class="spinner-border spinner-border-sm me-1"></span>
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
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl(''), 
    email : new FormControl(''), 
    password : new FormControl('')
  }); 
}
