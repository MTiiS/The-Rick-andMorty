import { Component, ViewContainerRef } from '@angular/core';
import { CharactersService } from './services/characters.service';
import { Character } from './services/character.interface';
import { ModalService } from './modal/modal.service';
import { SearchService } from './search/search.service';
import { PaginationService } from './pagination/pagination.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'The Rick and Morty';
  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  modalIsClosed: boolean = true;
  searchIsOpen: boolean = false;
  totalPages: number = 0;

  constructor(
    private charactersService: CharactersService,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService,
    private searchService: SearchService,
    private paginationService: PaginationService
  ) { }

  ngOnInit() {
    this.renderCharacters();
  }

  onPaginationChanged() {
    this.renderCharacters();
  }

  async renderCharacters() {
    let currentPage = this.paginationService.getCurrentPage();
    let searchRequest = this.searchService.getSearchRequest();
    this.characters = await this.charactersService.refreshCharacters(currentPage, searchRequest);
    this.totalPages = this.charactersService.getTotalPages();
  }

  openModal(character: Character) {
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.addDynamicComponent(character);
  }

  onSearch(params: Object) {
    this.searchService.createSearchRequest(params);
    this.renderCharacters();
  }

  toggleSearch() {
    this.searchIsOpen = !this.searchIsOpen;
  }
}
