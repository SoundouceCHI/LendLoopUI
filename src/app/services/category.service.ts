import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { SubCategory } from '../models/subCategory.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = "https://localhost:7041/api/Categories" ; 
  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl); 
  }

  getCategoriesName(categories: Category[]) : any[]{
    var categoriesNames: string[] = []; 
    categories.forEach(element => {
      if(element.categoryName != null){
        categoriesNames.push(element.categoryName)
      }
    });
    return categoriesNames;  
  }
  getSubCategories(): Observable<SubCategory[]>{
    const api = "https://localhost:7041/api/SubCategories"
    return this.http.get<SubCategory[]>(api); 
  }
  getSubCategoriesByCatId(categoryId: number): Observable<SubCategory[]>{
    const api = `https://localhost:7041/api/Subcategories/categoryId/${categoryId}`; 
    return this.http.get<SubCategory[]>(api); 
  }
}
