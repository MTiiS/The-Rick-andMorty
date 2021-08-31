import { Injectable } from '@angular/core';
import { RickAndMortyService } from '../rickAndMorty/rick-and-morty.service';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private httpService: RickAndMortyService) {
  }

  private characters: BehaviorSubject<object> = new BehaviorSubject<object>({});
  private totalPages: number = 0;

  setCharacters(characters: Array<object>): void {
    this.characters.next(characters);
  }

  getCharacters(): Observable<Array<object>> {
    return this.characters as Observable<Array<object>>;
  }

  setTotalPages(pages: number): void {
    this.totalPages = pages;
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  async refreshCharacters() {
    let totalPages: number = 0;
    let characters: Array<object> = [];
    let apiData: any = await this.httpService.getCharactersFromApi().toPromise();
    if (apiData && !apiData.error) {
      totalPages = apiData.info.pages;
      characters = apiData.results.map( (character: any) => {
        return {
          id: character.id || null,
          image: character.image,
          name: character.name,
          status: character.status,
          gender: character.gender,
          location: character.location.name,
          episode: character.episode[0] || null
        };
      });
    }
    this.setCharacters(characters);
    this.setTotalPages(totalPages);
    return [];
  }
}
