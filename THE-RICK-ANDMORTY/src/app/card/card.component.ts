import { Component, Input } from '@angular/core';
import { ModalService } from '../card-modal/modal.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() character: any;

  constructor(private modal: ModalService) { }

  openModal(event: any) {
    let id = event.target.closest('[data-id]').getAttribute('data-id');
    this.modal.open(id);
  }
}
