import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { SubCategory } from '../models/subCategory.model';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="container">
    <div class="form_area">
        <p class="title">New Item</p>
        <form [formGroup]="itemForm" (ngSubmit)="submitItem()">
            <div class="form_group">
                <label class="sub_title" for="title">Title</label>
                <input formControlName="title" placeholder="Enter title of your new item" class="form_style" type="text">
            </div>
            <div class="form_group">
                <label class="sub_title" for="description">Description</label>
                <input formControlName="description" placeholder="description" id="description" class="form_style" type="email">
            </div>
            <div class="form_group">
                <label class="sub_title" for="category">Category</label>
                <select formControlName="categoryId" id="category" class="form_style">
                  <option *ngFor="let category of categories" [value]="category.categoryId">{{ category.categoryName }}</option>                
                </select>
            </div>
            <div *ngIf="itemForm.get('categoryId')?.value !== ''" class="form_group">
            <label class="sub_title" for="subCategory">SubCategory</label>
            <select formControlName="subCategoryId" id="subCategory" class="form_style">
                  <option *ngFor="let subCategory of subCategories" [value]="subCategory.subcategoryId">{{ subCategory.subcategoryName }}</option>                
                </select>
            </div>
            <div class="form_group">
                <label class="sub_title" for="password">Image</label>
                <label class="custum-file-upload" for="file">
                <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                </div>
                <div class="text">
                  <span>Click to upload image</span>
                  </div>
                  <input type="file" (change)="onFileSelected($event)">
                  

                </label>
            </div>
            <div>
              <button class="btn">Rent It</button>
            </div><a class="link" href="">
        
    </a></form></div>
  
  </div>
  `,
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit {
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  id: number = 0; 
  itemForm = new FormGroup({
    description: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    itemImage: new FormControl(''),
    categoryId: new FormControl('', Validators.required), 
    subCategoryId: new FormControl('', Validators.required)
  });
  selectedFile: File | null = null;
  item: Item = new Item();

  constructor(private authService: AuthService, private categoryService: CategoryService, private router: Router, private itemService: ItemService) {}

  ngOnInit() {
    const sessionInfo = this.authService.getSessionInfo();  
    if(sessionInfo ){
      this.id = Number(sessionInfo.id); 
    }
    this.loadData();
    this.itemForm.get('categoryId')?.valueChanges.subscribe(categoryId => {
      if (categoryId) {
        this.loadSubCategories(parseInt(categoryId));
      } else {
        this.subCategories = [];
      }
      console.log(this.subCategories)
    });
  }

  loadData() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log("Error: ", error);
      }
    );
    
  }
  loadSubCategories(categoryId: number){
    console.log("CategoryId : "); 
    console.log(categoryId); 
    this.categoryService.getSubCategoriesByCatId(categoryId).subscribe(
      data => {
        this.subCategories = data;
        console.log(this.subCategories)
      },
      error => {
        console.log("Error: ", error);
      }
    );
  }
  submitItem() {
    if (this.itemForm.valid) {
      this.item.description = this.itemForm.get('description')?.value ?? ''; 
      this.item.title = this.itemForm.get('title')?.value ?? '';
      this.item.subcategoryId = Number(this.itemForm.get('subCategoryId')?.value);
      this.item.userId = this.id; 

      
      if (this.selectedFile) {
        this.itemService.postItem(this.item, this.selectedFile).subscribe({
          next: (response) => console.log('Item successfully added', response),
          error: (error) => console.error('Failed to add item', error)
        });
      } else {
        console.error('No file selected');
      }
    
    } else {
      console.error('Form is not valid');
    }
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    }
  }
}