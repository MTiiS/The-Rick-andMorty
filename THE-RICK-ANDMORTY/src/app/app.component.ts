import { Component } from '@angular/core';
import { CharactersService } from './services/character/characters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'THE-RICK-AND-MORTY';
  characters: any = [];

  constructor(private charactersService: CharactersService) { }

  async ngAfterViewInit() {
    await this.charactersService.refreshCharacters();
    this.charactersService.getCharacters().subscribe( (val) => {
      this.characters = val;
    });
  }
}
