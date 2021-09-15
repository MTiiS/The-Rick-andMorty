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

  handleLinkClick(character: Character) {
    this.openModal.emit(character)
  }

  handleFieldClick(e: MouseEvent, value: String) {
    let field = String(((<HTMLElement>e.target).dataset.id));
    this.onFieldClick.emit({[field]: value});
  }
}
