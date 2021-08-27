import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CurrentPageService } from '../currentPage/current-page.service';
import { SearchService } from 'src/app/search/search.service';


@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  constructor(
    private http: HttpClient,
    private currentPageService: CurrentPageService,
    private search: SearchService
  ) { }

  getCharactersFromApi() {
    let currentPage = this.currentPageService.getCurrentPage();
    let searchRequest = this.search.getSearchRequest();
    let url = "https://rickandmortyapi.com/api/character/?page=" + currentPage + searchRequest;
    return this.http.get(url).toPromise().catch(() => {
      console.log("error");
    });;
  }
}
