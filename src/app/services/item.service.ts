import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
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
  getUrl(itemId: number): string {
    return `https://localhost:7041/api/Items/${itemId}/image`; 
  }
  getItemById(id :number): Observable<Item> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.get<Item>(url);
  }
  getItemByUserId(userId: number): Observable<Item[]>{
    const url = `${this.apiUrl}/searchItemByUserId/${userId}`; 
    console.log("URL"); 
    console.log(url); 
    return this.http.get<Item[]>(url); 
  }
  postItem(item: Item, file: File): Observable<Item> {
    const formData: FormData = new FormData();
    formData.append('title', item.title);
    formData.append('description', item.description);
    formData.append('userId', item.userId.toString());
    formData.append('subcategoryId', item.subcategoryId.toString());
    formData.append('statusId', item.statusId.toString());
    formData.append('image', file, file.name);

    return this.http.post<Item>(this.apiUrl, formData);
  }
  searchItems(title?: string, address?: string, userId?: number): Observable<Item[]> {
    let params = new HttpParams();
    if (title) {
      params = params.append('title', title);
    }
    if (address) {
      params = params.append('address', address);
    }
    if (userId !== undefined) {
      params = params.append('userId', userId.toString());
    }

    return this.http.get<Item[]>(`${this.apiUrl}/searchItems`, { params });
  }
}
