import { Component } from '@angular/core';
import { CharactersService } from './services/characters.service';
import { Character } from './character';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'The Rick and Morty';
  characters: Observable<Character[]> = new Observable;

  constructor(private charactersService: CharactersService) { }

  ngOnInit() {
    this.characters = this.charactersService.getCharacters();
  }
}
