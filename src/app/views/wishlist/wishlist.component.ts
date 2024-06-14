import { Component, Input, OnInit } from '@angular/core';
import { IWishlistItem } from 'src/app/interfaces/wishlist-item';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  public itemsList: IWishlistItem[] = [];
  public activeWishListItem: number | null = null;
  public showModal: boolean = false;
  public modalData: IWishlistItem | null = null;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  public openModal(item: IWishlistItem | null) {
    this.modalData = item;
    this.showModal = true;
  }

  public closeModal() {
    this.showModal = false;
  }

  public getItems(): void {
    this.apiService.getItems().subscribe({
      next: (data) => {
        this.itemsList = data;
      }
    })
  }
}
