import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CurrentPageService } from './current-page.service';

@Injectable({
  providedIn: 'root'
})

export class RickAndMortyService {

  constructor(private http: HttpClient, private currentPageService: CurrentPageService) {
  }

  getCharactersFromApi(): Promise<any> {
    let currentPage = this.currentPageService.getCurrentPage();

    let url = "https://rickandmortyapi.com/api/character/?page=" + currentPage;
    return this.http.get(url).toPromise();
  }
}
