import { Injectable } from '@angular/core';
import { RickAndMortyService } from '../rickAndMorty/rick-and-morty.service';
import {BehaviorSubject} from "rxjs";
import { AppLockService } from 'src/app/spinner/app-lock.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private httpService: RickAndMortyService, private appLock: AppLockService) {
  }

  title = 'THE-RICK-ANDMORTY';

  private characters: BehaviorSubject<object> = new BehaviorSubject<object>({});
  private totalPages: number = 0;

  setCharacters(characters: Array<object>) {
    this.characters.next(characters);
  }

  getCharacters() {
    return this.characters;
  }

  setTotalPages(pages: number) {
    this.totalPages = pages;
  }

  getTotalPages() {
    return this.totalPages;
  }

  async refreshCharacters() {
    this.appLock.setIsLocked(true);
    let totalPages: number = 0;
    let characters: Array<object> = [];
    let apiData: any = await this.httpService.getCharactersFromApi().toPromise();
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
    this.appLock.setIsLocked(false);
    return [];
  }
}
