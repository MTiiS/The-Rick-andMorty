import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CharactersService } from './services/character/characters.service';
import { SortService } from './sort/sort.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'THE RICK AND MORTY';
  characters: Observable< Array<object> > = new Observable;

  constructor(
    private charactersService: CharactersService,
    public sortService: SortService
  ) { }

  async ngOnInit() {
    this.characters = this.charactersService.getCharacters();
  }
}
