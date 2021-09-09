import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PaginationService } from '../pagination/pagination.service';

@Injectable({
  providedIn: 'root'
})

export class RickAndMortyService {

  constructor(private http: HttpClient, private paginationService: PaginationService) {
  }

  getCharacters(currentPage: number, searchRequest: string): Promise<any> {
    let url = "https://rickandmortyapi.com/api/character/?page=" + currentPage + searchRequest;
    return this.http.get(url).toPromise().catch(() => {
      console.log("error");
    });
  }

  getEpisode(url: string) {
    return this.http.get(url).toPromise().catch(() => {
      console.log("error");
    });
  }
}
