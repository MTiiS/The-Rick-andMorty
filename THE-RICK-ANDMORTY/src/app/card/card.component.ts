import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../services/character.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Input() character?: Character;
  @Output() openModal: EventEmitter<Character> = new EventEmitter<Character>();
  @Output() onFieldClick: EventEmitter<FormData> = new EventEmitter<FormData>();

  linkClick(character: Character) {
    this.openModal.emit(character)
  }

  fieldClick(e: MouseEvent, value: string) {
    let field = ((<HTMLElement>e.target).dataset.id);
    const formData = new FormData;
    if (field && value) {
      formData.append(field, value)
    }
    this.onFieldClick.emit(formData);
  }
}
