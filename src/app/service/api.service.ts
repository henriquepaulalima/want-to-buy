import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWishlistItem } from '../interfaces/wishlist-item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public readonly apiKey = "http://localhost:8080";

  constructor(
    private http: HttpClient
  ) { }

  getItems(page?: number, pageSize?: number): Observable<IWishlistItem[]> {
    let params = new HttpParams();

    if (page) params = params.set('_page', page);
    if (pageSize) params = params.set('_limit', pageSize);

    return this.http.get<IWishlistItem[]>(this.apiKey, { params });
  }

  createNewItem(wishlistItem: IWishlistItem) {
    return this.http.post<IWishlistItem>(this.apiKey, wishlistItem);
  }

  updateItem(wishlistItem: IWishlistItem) {
    const url = `${this.apiKey}/${wishlistItem.id}`;
    return this.http.put<IWishlistItem>(url, wishlistItem);
  }

  deleteItem(wishlistItem: IWishlistItem) {
    const url = `${this.apiKey}/${wishlistItem.id}`;
    return this.http.delete<IWishlistItem>(url);
  }
}
