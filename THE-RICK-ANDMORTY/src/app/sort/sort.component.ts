import { Component, OnInit } from '@angular/core';
import { SortService } from './sort.service';
import { CharactersService } from '../services/character/characters.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  constructor(private sortService: SortService, private charactersService: CharactersService) { }

  ngOnInit(): void {
  }

  async addSortEvent(e:any) {
    this.sortService.toogleSort();
    this.charactersService.refreshCharacters();
    e.target.classList.toggle("filter__button_reverse");
  }
}
