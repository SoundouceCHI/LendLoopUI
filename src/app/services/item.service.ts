import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = "https://localhost:7041/api/Items"; 
  constructor(private http: HttpClient) { }
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }
  getItemById(id :number): Observable<Item> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.get<Item>(url);
  }
}
