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
  characters?: Character[];

  constructor(private charactersService: CharactersService) { }

  ngOnInit() {
    this.getCharacters();
  }

  onPaginationChanged() {
    this.getCharacters();
  }

  async getCharacters() {
    this.characters = await this.charactersService.refreshCharacters();
  }
}
