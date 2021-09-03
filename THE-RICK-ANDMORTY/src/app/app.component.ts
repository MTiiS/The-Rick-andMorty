import { Component } from '@angular/core';
import { CharactersService } from './services/characters.service';
import { Character } from './services/character.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'The Rick and Morty';
  characters: Character[] = [];
  totalPages: number = 0;

  constructor(private charactersService: CharactersService) { }

  ngOnInit() {
    this.renderCharacters();
  }

  onPaginationChanged() {
    this.renderCharacters();
  }

  async renderCharacters() {
    this.characters = await this.charactersService.refreshCharacters();
    this.totalPages = this.charactersService.getTotalPages();
  }
}
