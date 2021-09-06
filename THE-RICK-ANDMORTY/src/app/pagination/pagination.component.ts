import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { PaginationService } from './pagination.service';
import { PaginationButton } from './paginationButton';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent {

  @Input() totalPages: number = 0;
  @Output() onChange = new EventEmitter();
  displayedButtons: Array<PaginationButton> = [];

  constructor(
    private configService: ConfigService,
    private paginationService: PaginationService
  ) { }

  ngOnChanges() {
    if (this.totalPages) {
      this.refreshDisplayedButtons();
    }
  }

  setDisplayedButtons(displayedButtons: Array<PaginationButton>) {
    this.displayedButtons = displayedButtons;
  }

  getDisplayedButtons() {
    return this.displayedButtons;
  }

  refreshDisplayedButtons() {
    let displayedButtons: Array<PaginationButton> = [];
    let totalPages = this.totalPages;

    // config
    let prevButton = this.configService.getConfig("PREV_BUTTON");
    let nextButton = this.configService.getConfig("NEXT_BUTTON");
    let totalButtons = this.configService.getConfig("TOTAL_PAGIN_BUTTONS");
    let offsetStart = this.configService.getConfig("OFFSET_START");
    let offsetStep = this.configService.getConfig("OFFSET_STEP");
    let firstPage = this.configService.getConfig("FIRST_LOAD_PAGE");

    let currentPage = this.paginationService.getCurrentPage();
    let firstButtonNumber = currentPage;

    if (totalPages) {

      // if current page < offsetStart rendering always starts from "1" button without offset
      if (currentPage < offsetStart) {
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
        displayedButtons.push(new PaginationButton( String(i), String(i), isActive) );
      }

      // add navigation buttons
      let isDisabled = false;
      isDisabled = currentPage === firstPage;
      displayedButtons.unshift( new PaginationButton(prevButton.id, prevButton.content, false, isDisabled) );
      isDisabled = currentPage === totalPages;
      displayedButtons.push( new PaginationButton(nextButton.id, nextButton.content, false, isDisabled) );
    }

    // add buttons to array
    this.setDisplayedButtons(displayedButtons);
  }

  onPaginationClick(e: any, button: PaginationButton) {
    if (!button.isDisabled && !button.isActive) {
      this.paginationService.switchToPage(button.id);
      this.refreshDisplayedButtons();
      this.onChange.emit();
    }
  }
}
