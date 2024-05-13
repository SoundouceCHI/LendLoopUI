import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
      <img class="listingPhoto" [src]="this.item?.itemImage">
      <section>
        <h2>{{this.item?.title}}</h2>
        <p>{{this.item?.description}}</p>
      </section>
      <section>
        <h2>Item available for now </h2>
        <p>{{this.item?.statusId}}</p>
        <button>Request</button>
      </section>
      <section>
        <h3>{{this.item?.userId}}</h3>
        <a>Send message</a>
      </section>
    </article>
    
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute); 
  item : Item | undefined ;  
  itemId; 

  constructor(private itemService: ItemService){
    this.itemId = Number(this.route.snapshot.params['id']); 
  }
  ngOnInit(){
    this.loadItem(); 
  }
  loadItem(){
    this.itemService.getItemById(this.itemId).subscribe(data => {
      this.item = data
    }, error => {
      console.log("Error : ", error); 
    })
  }
}