import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  writeCharacter(character: string) {
    localStorage.setItem('character', character)
  }

  searchRequest: string = "";

  setSearchRequest(filter: string) {
    this.searchRequest = filter;
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

    let request = Object.entries(dataForm).map( ([key, val]) => `${key}=${val}` ).join('&');
    request = "&" + request;
    this.setSearchRequest(request);
  }
}
