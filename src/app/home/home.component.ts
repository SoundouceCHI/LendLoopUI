import { Component } from '@angular/core';
import { ItemsResultComponent } from '../items-result/items-result.component';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ItemsResultComponent, CommonModule],
  template: `
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

  constructor(private itemService: ItemService){}

  ngOnInit(){
    this.loadItems(); 
  }
  loadItems(){
    this.itemService.getItems().subscribe(data => {
      this.items = data
  }, error => {
    console.log("Error : ", error); 
  })
    
  }
}
