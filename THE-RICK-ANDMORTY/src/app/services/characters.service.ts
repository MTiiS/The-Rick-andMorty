import { Injectable } from '@angular/core';
import { RickAndMortyService } from './rick-and-morty.service';
import { Subject, Observable } from "rxjs";
import { Character } from '../character'
import { ApiData } from '../apiData';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private httpService: RickAndMortyService) {
  }

  private characters: Subject<Character[]> = new Subject;
  private totalPages: number = 0;

  setCharacters(characters: Character[]): void {
    this.characters.next(characters);
  }

  getCharacters(): Observable<Character[]> {
    return this.characters as Observable<Character[]>;
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
    let apiData: ApiData = await this.httpService.getCharactersFromApi().toPromise();
    if (apiData && !apiData.error) {
      totalPages = apiData.info.pages;
      characters = apiData.results.map( (character: Character) => character );
    }
    this.setCharacters(characters);
    this.setTotalPages(totalPages);
    return [];
  }
}
