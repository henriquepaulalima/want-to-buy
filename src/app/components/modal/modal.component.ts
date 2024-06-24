import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IWishlistItem } from 'src/app/interfaces/wishlist-item';
import { ApiService } from 'src/app/service/api.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalData: IWishlistItem | null = null;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<void>();

  public showForm: boolean = false;
  public form!: FormGroup;
  public formData!: IWishlistItem;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    if (this.modalData) {
      this.formData = this.modalData;
    } else {
      this.formData = {
        id: "",
        title: "",
        description: "",
        cratedAt: new Date(),
        price: null
      };
    }

    this.form = this.formBuilder.group({
      title: [this.formData?.title, [Validators.required]],
      description: [this.formData?.description, [Validators.required]],
      price: [this.formData?.price, [Validators.required]]
    });

    setTimeout(() => {
      this.showForm = true;
    }, 500);
  }

  public doCloseModal(): void {
    this.showForm = false;

    setTimeout(() => {
      this.closeModal.emit(true);
    }, 500);
  }

  public submitForm(): void {
    if (this.form.valid) {
      const itemId = this.modalData?.id ? this.modalData.id : uuidv4();
      const item: IWishlistItem = {
        id: itemId,
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
        cratedAt: new Date(),
        price: this.form.get('price')?.value
      };

      if (this.modalData) {
        this.apiService.updateItem(item).subscribe(() => {
          this.clearForm();
        });
      } else {
        this.apiService.createNewItem(item).subscribe(() => {
          this.clearForm();
        });
      }
    } else {
      console.error("Something went wrong when doing API request");
    }
  }

  public deleteItem(): void {
    if (this.modalData) {
      this.apiService.deleteItem(this.formData).subscribe(() => {
        this.clearForm();
        this.doCloseModal();
      });
    } else {
      console.error("Something went wrong when deleting current item");
    }
  }

  public clearForm(): void {
    this.form.reset();
    this.updateList.emit();
    this.doCloseModal();
  }

}
