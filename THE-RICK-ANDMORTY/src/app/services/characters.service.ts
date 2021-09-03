import { Injectable } from '@angular/core';
import { RickAndMortyService } from './rick-and-morty.service';
import { Character } from './character.interface'


@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private httpService: RickAndMortyService) {}

  private characters: Character[] = [];
  private totalPages: number = 0;

  setCharacters(characters: Character[]): void {
    this.characters = characters;
  }

  getCharacters(): Character[] {
    return this.characters
  }

  setTotalPages(pages: number): void {
    this.totalPages = pages;
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  async refreshCharacters() {
    let totalPages: number = 0;
    let characters: Character[] = [];
    let apiData: any = await this.httpService.getCharactersFromApi();
    if (apiData && !apiData.error) {
      totalPages = apiData.info.pages;
      characters = apiData.results.map( (character: Character) => character );
    }
    this.setCharacters(characters);
    this.setTotalPages(totalPages);
    return characters;
  }
}
