import { Component, Input } from '@angular/core';
import { Item } from '../models/item.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-items-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
    <img class="listing-photo" [src]="getImageUrl(item.itemId)" alt="Photo of {{item.title}}">
    <h2 class="listing-heading">{{item.title}}</h2>
    <p class="listing-lenderName">{{item.userId}}</p>
    <a [routerLink]="['/details', item.itemId]">Details</a>
    </section> `,
  styleUrl: './items-result.component.css'
})
export class ItemsResultComponent {
  @Input() item!: Item;
  getImageUrl(itemId: number): string {
    return `https://localhost:7041/api/Items/${itemId}/image`; 
  }
}
