import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Character } from '../services/character.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Input() character?: Character;
  @Output() openModal: EventEmitter<Character> = new EventEmitter<Character>();

  constructor() { }

  setSelectedCharacter(character: Character) {
    this.openModal.emit(character)
  }
}
