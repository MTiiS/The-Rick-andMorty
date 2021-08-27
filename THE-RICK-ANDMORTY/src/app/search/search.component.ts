import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { CharactersService } from '../services/character/characters.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private search: SearchService,
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    let form = document.querySelector(".search__form") as HTMLFormElement;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.search.createSearchRequest();
      this.charactersService.refreshCharacters();
    });
  }
}
