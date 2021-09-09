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
  @Output() onFieldClick: EventEmitter<object> = new EventEmitter<object>();

  linkClick(character: Character) {
    this.openModal.emit(character)
  }

  fieldClick(e: MouseEvent, value: String) {
    let field = ((<HTMLElement>e.target).dataset.id)
    this.onFieldClick.emit({ field: field, value: value });
  }
}
