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

  getCharacterById(id: number) {
    return this.getCharacterByProperty( 'id', Number(id) );
  }

  getCharacterByProperty(propertyName: any, propertyValue: any) {
    let characters = this.getCharacters();
    return characters.find( (character: any) => character[propertyName] === propertyValue );
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

  async setCharacterEpisodeName(character: Character) {
    let url = character.episode[0];
    let episode: any = await this.httpService.getEpisodeFromApi(url);
    character.firstSeen = episode.name;
  }
}
