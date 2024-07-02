import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { LoansService } from '../services/loans.service';
import { LoanPeriod } from '../models/loanPeriod.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatNativeDateModule],
  template: `
    <article class="details">
    <img class="listing-photo" [src]="getImageUrl(this.item?.itemId)" alt="Photo of {{this.item?.title}}">
      <div class ="itemDescAvail">
      <section>
        <h2>{{this.item?.title}}</h2>
        <p>{{this.item?.description}}</p>
      </section>
      <section>
        <h2>Item available for now </h2>
        <p>{{this.item?.statusId}}</p>
        <button mat-raised-button (click)="openPicker()">Request</button>

      </section>
      </div>
      <div class="user">
        <h3>{{this.item?.userId}}</h3>
        <a>Send message</a>
      </div>
    </article>
    
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute); 
  item : Item | undefined ;  
  itemId; 
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  unavailableDates: Date[] = [];
  dates : LoanPeriod[] = []; 

  constructor(private itemService: ItemService, private router: Router, private userService: UserService){
    this.itemId = Number(this.route.snapshot.params['id']); 
  }
  ngOnInit(){
    this.loadItem(); 
  }
  loadItem(){
    this.itemService.getItemById(this.itemId).subscribe(data => {
      this.item = data; 
      console.log("ITEM ID : ", this.item.itemId)
    }, error => {
      console.log("Error : ", error); 
    })
  }
  getImageUrl(itemId: any): string {
    return this.itemService.getUrl(itemId); 
  }
  openPicker() {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/booking', this.itemId]);
    } else {
      this.router.navigate(['/login']);
    }
  } 
}
