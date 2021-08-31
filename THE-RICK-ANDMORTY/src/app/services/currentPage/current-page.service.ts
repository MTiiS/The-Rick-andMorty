import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentPageService {

  constructor(private configService: ConfigService) { }


  firstPage = this.configService.getConfig("FIRST_LOAD_PAGE");
  currentPage = this.firstPage;

  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  switchToPage(pageId: string): void {

    // config
    let PREV_BUTTON = this.configService.getConfig("PREV_BUTTON");
    let NEXT_BUTTON = this.configService.getConfig("NEXT_BUTTON");
    let currentPage = this.getCurrentPage();

    switch (pageId) {
      case PREV_BUTTON.id:
        currentPage--;
        break;
      case NEXT_BUTTON.id:
        currentPage++;
        break;
      default:
        currentPage = Number(pageId);
    }
    this.setCurrentPage(currentPage);
  }
}
