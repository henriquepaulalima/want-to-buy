import { Component, OnInit } from '@angular/core';
import { IWishlistItem } from 'src/app/interfaces/wishlist-item';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public wishlistItems: IWishlistItem[] = [];
  public activeWishListItem: number | null = null;
  public showModal: boolean = false;
  public modalData: IWishlistItem | null = null;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  public getItems(): void {
    this.apiService.getItems(1, 5).subscribe({
      next: (data) => {
        this.wishlistItems = data;
      }
    });
  }

  public openModal(item: IWishlistItem | null): void {
    this.modalData = item;
    this.showModal = true;
  }

  public closeModal(): void {
    this.showModal = false;
  }

}
