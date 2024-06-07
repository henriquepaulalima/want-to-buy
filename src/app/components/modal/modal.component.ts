import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();

  showForm: boolean;

  constructor() {
    this.showForm = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showForm = true;
    }, 500);
  }

  doCloseModal() {
    this.showForm = false;
    setTimeout(() => {
      this.closeModal.emit(true);
    }, 500);
  }

}
