import { Component } from '@angular/core';
import { ItemsResultComponent } from '../items-result/items-result.component';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ItemsResultComponent, CommonModule, FormsModule],
  template: `
    <div class="research">
        <h2>Share your items on LendIt</h2>
        <p>Discover a world of lending opportunities!</p>
        <form (ngSubmit)="applyFilter()">
        <input type="text" placeholder="Item" [(ngModel)]="filter.title" name="title">
            <input type="text" placeholder="Item location" [(ngModel)]="filter.location" name="location">
            <input type="text" placeholder="User name" [(ngModel)]="filter.userName" name="userName">
            <button type="submit">Filter</button>
        </form>
    </div>
    <section>
      <section class="results">
      <app-items-result *ngFor="let item of items" [item]= "item"></app-items-result>
      </section> 
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items: Item[] = []; 
  filter = {
    title: '',
    location: '',
    userName: ''
  };

  constructor(private itemService: ItemService, private userService: UserService){}

  ngOnInit(){
    this.loadItems(); 
  }
  loadItems() {
    this.itemService.getItems().subscribe(data => {
      this.items = data; 
    }, error => {
      console.log("Error : ", error); 
    });
  }

  applyFilter() {
    const userName = this.filter.userName; 
    if (userName) {
      this.userService.getUserIdByUserName(userName).subscribe(
        userId => {
          this.filterItems(userId);
        },
        error => {
          console.log("Error fetching userId:", error);
        }
      );
    } else {
      this.filterItems(undefined);
    }
  }

  filterItems(userId: number | undefined) {
    this.itemService.searchItems(this.filter.title, this.filter.location, userId).subscribe(
      data => {
        this.items = data;
        console.log(this.items);
      },
      error => {
        console.log("Error searching items:", error);
      }
    );
  }
}
