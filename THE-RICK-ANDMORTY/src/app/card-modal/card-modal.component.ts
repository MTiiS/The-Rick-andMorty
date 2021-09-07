import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from 'src/app/services/character.interface';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent {

  @Input() character: Character | null = null;
  @Output() onClose = new EventEmitter();

  constructor(private charactersService: CharactersService) { }

  ngOnChanges() {
    if (this.character) {
      this.charactersService.setCharacterEpisodeName(this.character);
    }
  }

  closeModal() {
    this.onClose.emit()
  }
}
