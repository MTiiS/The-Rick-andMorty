import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class RickAndMortyService {

  constructor(private http: HttpClient) {
  }

  getCharacters(currentPage: number, searchRequest: any): Promise<any> {
    const options = { params: new HttpParams({ fromObject: searchRequest }).set('page', currentPage) };
    let url = "https://rickandmortyapi.com/api/character";
    return this.http.get(url, options).toPromise().catch(() => {
      console.log("error");
    });
  }

  getEpisode(url: string) {
    return this.http.get(url).toPromise().catch(() => {
      console.log("error");
    });
  }
}
