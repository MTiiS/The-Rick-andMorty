import { Injectable } from '@angular/core';
import { PaginationService } from '../pagination/pagination.service';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private paginationService: PaginationService) { }

  searchRequest: object = {};

  setSearchRequest(searchRequest: object) {
    this.searchRequest = searchRequest;
  }

  getSearchRequest() {
    return this.searchRequest;
  }

  createSearchRequest(params: object) {
    this.setSearchRequest(params);
    this.paginationService.setCurrentPage(1);
  }
}
