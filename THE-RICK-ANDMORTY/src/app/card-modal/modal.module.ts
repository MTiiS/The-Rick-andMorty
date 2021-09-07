import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModalComponent } from './card-modal.component';



@NgModule({
  declarations: [CardModalComponent],
  imports: [
    CommonModule
  ],
  exports: [CardModalComponent]
})
export class ModalModule { }
