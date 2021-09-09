import { Injectable } from '@angular/core';
import { PaginationService } from '../pagination/pagination.service';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private paginationService: PaginationService) { }

  searchRequest: string = "";

  setSearchRequest(searchRequest: string) {
    this.searchRequest = searchRequest;
  }

  getSearchRequest() {
    return this.searchRequest;
  }

  createSearchRequest(field: string = "null", value: string = "null") {
    let form = document.querySelector(".search__form") as HTMLFormElement;
    const formData = new FormData(form);
    let dataForm: any = {};

    if (field !== "null" && value !== "null") {
      formData.append(field, value);
    }

    formData.forEach(function (value, key) {
      dataForm[key] = value;
    });

    let request = Object.entries(dataForm).map(([key, val]) => `${key}=${val}`).join('&');
    request = "&" + request;
    this.setSearchRequest(request);
    this.paginationService.setCurrentPage(1);
  }
}
