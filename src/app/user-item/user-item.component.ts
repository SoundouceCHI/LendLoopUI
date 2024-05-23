import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { ItemsResultComponent } from '../items-result/items-result.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [ItemsResultComponent, CommonModule, RouterModule],
  template: `
  <div class="profile-container">
    <div class="profile-pic-info">
      <div class="profile-pic">
        <img src="" alt="Profile Picture">
      </div>
      <div class="profile-info">
        <h3>{{ userName }}</h3>
        <p>About: userAbout </p>
        <p>Location: userLocation </p>
        <p>Followers:  userFollowers </p>
      </div>
    </div>
    <button class="edit-profile-button">Edit my profile</button>
  </div>
  <div class="items">
    <h3>My Items :</h3>
    <p>{{userItems.length}} items</p>
  </div>

  <section class="items-results">
    <app-items-result *ngFor="let item of userItems" [item]="item"></app-items-result>
  </section>
  
  <button class="addItem" [routerLink]="['/addItem', this.id]">Add Item</button>
  `,
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {
  id = 0; 
  userItems: Item[] = [];
  userName = "";  

  constructor(private route: ActivatedRoute, private itemService: ItemService, private authService: AuthService){
    this.id = Number(route.snapshot.params['id']); 
  }

  ngOnInit(){
    const sessionInfo = this.authService.getSessionInfo();  
    if(sessionInfo ){
      this.userName = sessionInfo.name; 
    }
    this.itemService.getItemByUserId(this.id)
    .subscribe(data => {
      this.userItems = data
    }, error => {
      console.log("Error : ", error); 
    })
    
  }

}
