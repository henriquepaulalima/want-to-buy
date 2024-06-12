import { Component, OnInit } from '@angular/core';
import { IWishlistItem } from 'src/app/interfaces/wishlist-item';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  itemsList: IWishlistItem[] = [];
  activeWishListItem: number | null = null;
  showModal: boolean = false;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  closeModal() {
    this.showModal = false;
  }

  getItems(): void {
    this.apiService.getAllWishlishItems().subscribe({
      next: (data) => {
        this.itemsList = data;
      }
    })
  }
}
