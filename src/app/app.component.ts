import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterModule ],
  template: `
    <main>
      <header class="lendLoop">
        <div class="header-content">
        <h1>LendLoop</h1>
        <form class="form">
          <input type="text" placeholder="Search for items to lend">
          <button class="primary" type="button">Search</button>
        </form>
        <div class="header-buttons">
          <button>Items available</button>
          <button [routerLink]="['/login']">Sign In</button>
          <button >Sign Up</button>
        </div>
        </div>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'LendLoopUI';
}
