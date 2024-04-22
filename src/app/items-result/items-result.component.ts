import { Component, Input } from '@angular/core';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-items-result',
  standalone: true,
  imports: [],
  template: `
    <section class="listing">
    <img class="listing-photo" alt="{{item.title}}">
    <h2 class="listing-heading">{{item.title}}</h2>
    <p class="listing-lenderName"></p>
    </section> `,
  styleUrl: './items-result.component.css'
})
export class ItemsResultComponent {
  @Input() item!: Item;

}
