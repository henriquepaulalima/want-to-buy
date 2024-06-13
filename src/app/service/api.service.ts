import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWishlistItem } from '../interfaces/wishlist-item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public readonly apiKey = "http://localhost:4000/items";

  constructor(
    private http: HttpClient
  ) { }

  getAllWishlishItems(): Observable<IWishlistItem[]> {
    return this.http.get<IWishlistItem[]>(this.apiKey);
  }

  createNewItem(wishlistItem: IWishlistItem) {
    return this.http.post<IWishlistItem>(this.apiKey, wishlistItem);
  }

  updateItem(wishlistItem: IWishlistItem) {
    const url = `${this.apiKey}/${wishlistItem.id}`;
    return this.http.put<IWishlistItem>(url, wishlistItem);
  }
}
