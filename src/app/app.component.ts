import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterModule, CommonModule ],
  template: `
    <main>
      <header class="lendLoop">
        <div class="header-content">
          <h1>LendLoop</h1>
          <form class="form">
            <input type="text" placeholder="Search for items to lend">
            <button class="primary" type="button">Search</button>
          </form>
          <label *ngIf="isLoggedIn()" class="popup">
            <input type="checkbox">
            <div class="burger" tabindex="0">
              <span></span>
              <span></span>
            </div>
            <nav class="popup-window">
              <legend>Actions</legend>
              <ul>
                <li>
                  <button>
                    <span>My Items</span>
                  </button>
                </li>
                <hr>
                <li>
                  <button>
                    <span>Rental History</span>
                  </button>
                </li>
              </ul>
            </nav>
          </label>
          <div class="header-buttons">
            <button *ngIf="isLoggedIn()" [routerLink]="['/member', userId, 'items']" class="button">
            <svg
              class="icon"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"
              ></path>
              </svg>
            </button>
            <button *ngIf="!isLoggedIn()" [routerLink]="['/login']">Sign In | Sign Up</button>
            <button *ngIf="isLoggedIn()" (click)="logout()">Logout</button>
          </div>
        </div>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.component.css',
  providers : [AuthService]
})
export class AppComponent {
  title = 'LendLoopUI';
  userId =''; 
  userName = ''; 

  private authService = inject(AuthService); 
  constructor(private userService: UserService, private router: Router){ }
  ngOnInit(){
    console.log(this.isLoggedIn());
    const sessionInfo = this.authService.getSessionInfo();  
    if(this.isLoggedIn() && sessionInfo ){
      this.userId = sessionInfo.id
      this.userName = sessionInfo.name; 
    }
  }
  isLoggedIn(): boolean{
    return this.userService.isLoggedIn(); 
  }
  
  logout(){
    this.userService.logout(); 
    this.router.navigate(['/login']); 
  }
  getUserId(){
    
  }

}
