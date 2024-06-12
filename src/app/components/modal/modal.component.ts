import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() closeModal = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<void>();

  public showForm: boolean = false;
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    setTimeout(() => {
      this.showForm = true;
    }, 500);
  }

  doCloseModal(): void {
    this.showForm = false;

    setTimeout(() => {
      this.closeModal.emit(true);
    }, 500);
  }

  saveNewItem(): void {
    if (this.form.valid) {
      const id = uuidv4();
      const newItem: IWishlistItem = {
        id: id,
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value
      };

      this.apiService.createNewItem(newItem).subscribe(() => {
        this.clearForm();
      })
    }
  }

  clearForm(): void {
    this.form.reset();
    this.updateList.emit();
    this.doCloseModal();
  }

}
