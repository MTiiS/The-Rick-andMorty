import { Component, ViewContainerRef } from '@angular/core';
import { CharactersService } from './services/characters.service';
import { Character } from './services/character.interface';
import { ModalService } from './modal/modal.service';
import { SortService } from './sort/sort.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'The Rick and Morty';
  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  modalIsClosed?: boolean;
  totalPages: number = 0;

  constructor(private charactersService: CharactersService,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService,
    public sortService: SortService
    ) { }

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

  openModal(character: Character) {
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    this.modalService.addDynamicComponent(character);
  }
}
