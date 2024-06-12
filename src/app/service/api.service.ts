import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWishlistItem } from '../interfaces/wishlist-item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public readonly apiKey = "https://nexus-data.vercel.app/want_to_buy";

  constructor(
    private http: HttpClient
  ) { }

  getAllWishlishItems(): Observable<IWishlistItem[]> {
    return this.http.get<IWishlistItem[]>(this.apiKey);
  }

  createNewItem(wishlistItem: IWishlistItem) {
    return this.http.post<IWishlistItem>(this.apiKey, wishlistItem);
  }
}

