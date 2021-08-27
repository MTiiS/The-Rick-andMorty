import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../services/config/config.service';
import { CharactersService } from '../services/character/characters.service';
import { CurrentPageService } from '../services/currentPage/current-page.service';
import { PaginationButton } from './paginationButton';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent {

  @Input() button: Array<PaginationButton> = [];
  displayedButtons: Array<PaginationButton> = [];


  constructor(
    private configService: ConfigService,
    private charactersService: CharactersService,
    private currentPageService: CurrentPageService
  ) { }

  async ngOnInit() {
    this.charactersService.getTotalPages().subscribe( (totalPages) => {
      this.refreshDisplayedButtons(totalPages);
    })
  }

  setDisplayedButtons(displayedButtons: Array<PaginationButton>) {
    this.displayedButtons = displayedButtons;
  }

  getDisplayedButtons() {
    return this.displayedButtons;
  }

  refreshDisplayedButtons(totalPages: number = 0) {

    let displayedButtons: Array<PaginationButton> = [];

    // config
    let prevButton = this.configService.getConfig("PREV_BUTTON");
    let nextButton = this.configService.getConfig("NEXT_BUTTON");
    let totalButtons = this.configService.getConfig("TOTAL_PAGIN_BUTTONS");
    let offsetStart = this.configService.getConfig("OFFSET_START");
    let offsetStep = this.configService.getConfig("OFFSET_STEP");
    let firstPage = this.configService.getConfig("FIRST_LOAD_PAGE");

    let currentPage = this.currentPageService.getCurrentPage();
    let firstButtonNumber = currentPage;

    // if current page < offsetStart rendering always starts from "1" button without offset
    if (currentPage < offsetStart || currentPage < totalButtons) {
      firstButtonNumber = 1;
      offsetStep = 0;
    } else if (currentPage >= totalPages - offsetStep) {
      firstButtonNumber = (totalPages - totalButtons);
      offsetStep = 0;
    }

    let lastButtonNumber = (firstButtonNumber + totalButtons - offsetStep);
    if (lastButtonNumber > totalPages) {
      lastButtonNumber = totalPages;
    }

    // add page buttons
    for (let i = firstButtonNumber - offsetStep; i <= lastButtonNumber; i++) {
      let isActive = i === currentPage;
      displayedButtons.push( new PaginationButton(i, String(i), isActive) );
    }

    let isDisabled = currentPage === firstPage;
    displayedButtons.unshift( new PaginationButton(prevButton.id, prevButton.content, false, isDisabled) );
    isDisabled = currentPage === totalPages;
    displayedButtons.push( new PaginationButton(nextButton.id, nextButton.content, false, isDisabled) );

    // add buttons to array
    this.setDisplayedButtons(displayedButtons);
  }

  addPaginationEvents(e: any) {
    if ( !e.target.classList.contains("pagination__button_disabled") ) {
      let pageId = e.target.getAttribute('data-id');
      this.currentPageService.switchToPage(pageId);
      this.refreshDisplayedButtons();
      this.charactersService.refreshCharacters();
    }
  }
}
