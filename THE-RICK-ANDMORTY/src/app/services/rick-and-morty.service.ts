import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PaginationService } from '../pagination/pagination.service';

@Injectable({
  providedIn: 'root'
})

export class RickAndMortyService {

  constructor(private http: HttpClient, private paginationService: PaginationService) {
  }

  getCharactersFromApi(): Promise<any> {
    let currentPage = this.paginationService.getCurrentPage();

    let url = "https://rickandmortyapi.com/api/character/?page=" + currentPage;
    return this.http.get(url).toPromise();
  }

  getEpisodeFromApi(url: string) {
    return this.http.get(url).toPromise();
  }
}
