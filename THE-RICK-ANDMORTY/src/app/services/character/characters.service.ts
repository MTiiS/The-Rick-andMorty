import { Injectable } from '@angular/core';
import { RickAndMortyService } from '../rickAndMorty/rick-and-morty.service';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CharactersService {

  constructor(private httpService: RickAndMortyService) {
  }

  title = 'THE-RICK-ANDMORTY';

  characters: BehaviorSubject<object> = new BehaviorSubject<object>({});
  totalPages: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  setCharacters(characters: Array<object>) {
    this.characters.next(characters);
  }

  getCharacters() {
    return this.characters;
  }

  setTotalPages(pages: number) {
    this.totalPages.next(pages);
  }

  getTotalPages() {
    return this.totalPages;
  }

  async refreshCharacters() {

    let totalPages: number = 0;
    let characters: Array<object> = [];
    let apiData: any = await this.httpService.getCharactersFromApi();
    if (apiData && !apiData.error) {
      totalPages = apiData.info.pages;
      characters = apiData.results.map((character: any) => {
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
