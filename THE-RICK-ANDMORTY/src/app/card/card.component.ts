import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Character } from '../services/character.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Input() character?: Character;
  @Output() onModalOpen: EventEmitter<Character> = new EventEmitter<Character>();

  constructor() { }

  setSelectedCharacter(character: Character) {
    this.onModalOpen.emit(character)
  }
}
