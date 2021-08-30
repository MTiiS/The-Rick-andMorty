import { Component } from '@angular/core';
import { CharactersService } from './services/character/characters.service';
import { SortService } from './sort/sort.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'THE-RICK-AND-MORTY';
  characters: any = [];

  constructor(
    private charactersService: CharactersService,
    private sortService: SortService,
  ) { }

  async ngOnInit() {
    await this.charactersService.refreshCharacters();
    this.charactersService.getCharacters().subscribe( (val) => {
      this.characters = val;
      this.characters = this.sortService.sort(this.characters, 'name');
    });
  }
}
