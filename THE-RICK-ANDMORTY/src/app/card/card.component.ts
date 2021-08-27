import { Component, Input } from '@angular/core';
import { SearchService } from '../search/search.service';
import { CharactersService } from '../services/character/characters.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor(private search: SearchService, private charactersService: CharactersService) { }

  @Input() character: any;

  searchCharacters(e: any) {
    if (e.target.dataset.status) {
      this.search.createSearchRequest('status', e.target.dataset.status);
      document.querySelector
    } else if (e.target.dataset.gender) {
      this.search.createSearchRequest('gender', e.target.dataset.gender);
    }
    this.charactersService.refreshCharacters();
  }
}
